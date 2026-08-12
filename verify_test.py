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

            # --- 1. DESKTOP PROPERTIES PAGE VERIFICATION ---
            print("Verifying Desktop Viewport on /#/properties...")
            page_desktop = browser.new_page(viewport={"width": 1440, "height": 900})
            page_desktop.goto("http://localhost:5173/#/properties")
            time.sleep(2.0)  # Wait for animations and images to render

            # Capture properties directory main layout
            page_desktop.screenshot(path="screenshots/desktop_properties_page.png")
            print("Saved screenshots/desktop_properties_page.png")

            # Perform search keyword entry
            print("Testing search input...")
            search_input = page_desktop.query_selector("#search")
            if search_input:
                search_input.fill("Obsidian")
                time.sleep(1.0)
                # Take filter-applied interaction screenshot
                page_desktop.screenshot(path="screenshots/property_card_interaction.png")
                print("Saved screenshots/property_card_interaction.png")

                # Clear search input
                search_input.fill("")
                time.sleep(0.5)

            # Click view details link on the first card
            print("Testing navigation to Property Detail Page...")
            detail_link = page_desktop.query_selector("a[href*='#/properties/']")
            if detail_link:
                detail_link.click()
                time.sleep(2.0)
                page_desktop.screenshot(path="screenshots/desktop_property_detail.png")
                print("Saved screenshots/desktop_property_detail.png")

            # --- 2. MOBILE PROPERTIES PAGE VERIFICATION ---
            print("Verifying Mobile Viewport on /#/properties...")
            page_mobile = browser.new_page(viewport={"width": 375, "height": 812})
            page_mobile.goto("http://localhost:5173/#/properties")
            time.sleep(2.0)

            # Capture mobile properties directory layout
            page_mobile.screenshot(path="screenshots/mobile_properties_page.png")
            print("Saved screenshots/mobile_properties_page.png")

            # Open mobile filter panel
            mobile_filter_btn = page_mobile.query_selector("[aria-label='Open mobile filters']")
            if mobile_filter_btn:
                mobile_filter_btn.click()
                time.sleep(1.0)
                page_mobile.screenshot(path="screenshots/mobile_filter_experience.png")
                print("Saved screenshots/mobile_filter_experience.png")

                # Close mobile filters
                close_btn = page_mobile.query_selector("[aria-label='Close filters']")
                if close_btn:
                    close_btn.click()
                    time.sleep(0.5)

            # Navigate to detail page on mobile
            mobile_detail_link = page_mobile.query_selector("a[href*='#/properties/']")
            if mobile_detail_link:
                mobile_detail_link.click()
                time.sleep(2.0)
                page_mobile.screenshot(path="screenshots/mobile_property_detail.png")
                print("Saved screenshots/mobile_property_detail.png")

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
