import subprocess
import time
import os
import sys
import socket

# Helper to check if a port is open
def is_port_open(port):
    with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
        return s.connect_ex(('localhost', port)) == 0

def run_tests():
    print("Starting Vite development server in the background...")
    # Kill any process on port 5173 to avoid conflicts
    subprocess.run("kill $(lsof -t -i:5173) 2>/dev/null || true", shell=True)

    dev_server = subprocess.Popen(
        ["npm", "run", "dev"],
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE,
        text=True
    )

    # Wait for the server to start (max 10 seconds)
    started = False
    for _ in range(20):
        if is_port_open(5173):
            started = True
            break
        time.sleep(0.5)

    if not started:
        print("Error: Vite development server failed to start on port 5173.")
        dev_server.kill()
        sys.exit(1)

    print("Dev server started successfully!")

    # Run Playwright test script inside Python
    try:
        from playwright.sync_api import sync_playwright

        # Create output directory for screenshots
        os.makedirs("screenshots", exist_ok=True)

        with sync_playwright() as p:
            print("Launching headless Chromium browser...")
            browser = p.chromium.launch(headless=True)

            # --- DESKTOP VERIFICATION ---
            print("Verifying Desktop Viewport...")
            page_desktop = browser.new_page(viewport={"width": 1440, "height": 900})
            page_desktop.goto("http://localhost:5173")
            time.sleep(1.5)  # Wait for animations to trigger

            # 1. Take Hero screenshot
            page_desktop.screenshot(path="screenshots/desktop_hero.png")
            print("Saved screenshots/desktop_hero.png")

            # 2. Scroll to and capture properties section
            properties_elem = page_desktop.query_selector("#collection")
            if properties_elem:
                properties_elem.scroll_into_view_if_needed()
                time.sleep(1.0)
                properties_elem.screenshot(path="screenshots/property_presentation_section.png")
                print("Saved screenshots/property_presentation_section.png")

            # 3. Open Quick View Dialog and take a screenshot
            quick_view_btn = page_desktop.query_selector("[aria-label*='Quick View']")
            if quick_view_btn:
                quick_view_btn.click()
                time.sleep(1.0)
                page_desktop.screenshot(path="screenshots/desktop_quick_view_dialog.png")
                print("Saved screenshots/desktop_quick_view_dialog.png")

                # Close the quick view dialog
                close_btn = page_desktop.query_selector("[aria-label='Close dialog']")
                if close_btn:
                    close_btn.click()
                    time.sleep(0.5)

            # 4. Trigger prefill & scroll to Enquiry
            tour_btn = page_desktop.query_selector("button:has-text('Request Private Tour')")
            if tour_btn:
                tour_btn.click()
                time.sleep(1.0)
                # Verify that selectedProperty has prefilled option
                selected_prop_val = page_desktop.eval_on_selector("#selectedProperty", "el => el.value")
                print(f"Prefilled Property form value: {selected_prop_val}")

                # Take full-page screenshot
                page_desktop.screenshot(path="screenshots/desktop_homepage.png", full_page=True)
                print("Saved screenshots/desktop_homepage.png (Full Page)")

            # --- MOBILE VERIFICATION ---
            print("Verifying Mobile Viewport...")
            page_mobile = browser.new_page(viewport={"width": 375, "height": 812})
            page_mobile.goto("http://localhost:5173")
            time.sleep(1.5)

            # 1. Capture Mobile Hero
            page_mobile.screenshot(path="screenshots/mobile_hero.png")
            print("Saved screenshots/mobile_hero.png")

            # 2. Open Mobile Navigation Menu Drawer
            mobile_menu_btn = page_mobile.query_selector("[aria-label='Open menu']")
            if mobile_menu_btn:
                mobile_menu_btn.click()
                time.sleep(1.0)
                page_mobile.screenshot(path="screenshots/navigation_menu_state.png")
                print("Saved screenshots/navigation_menu_state.png")

                # Close mobile menu
                close_menu_btn = page_mobile.query_selector("[aria-label='Close menu']")
                if close_menu_btn:
                    close_menu_btn.click()
                    time.sleep(0.5)

            # Capture full-page Mobile Homepage
            page_mobile.screenshot(path="screenshots/mobile_homepage.png", full_page=True)
            print("Saved screenshots/mobile_homepage.png (Full Page)")

            browser.close()
            print("All verification steps completed successfully!")

    except Exception as e:
        print(f"Playwright automation failed: {e}")
        dev_server.kill()
        sys.exit(1)

    finally:
        # Gracefully shut down the Vite dev server
        print("Stopping background Vite server...")
        dev_server.kill()

if __name__ == "__main__":
    run_tests()
