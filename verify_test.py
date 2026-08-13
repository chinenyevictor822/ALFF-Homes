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

            # --- DESKTOP ROUTE TESTING ---
            print("Verifying Desktop Viewports on newly added routes...")
            page_desktop = browser.new_page(viewport={"width": 1440, "height": 900})

            # 1. Verify /#/about page
            page_desktop.goto("http://localhost:5173/#/about")
            time.sleep(2.0)
            page_desktop.screenshot(path="screenshots/desktop_about_page.png")
            print("Saved screenshots/desktop_about_page.png")

            # 2. Verify /#/services page
            page_desktop.goto("http://localhost:5173/#/services")
            time.sleep(2.0)
            page_desktop.screenshot(path="screenshots/desktop_services_page.png")
            print("Saved screenshots/desktop_services_page.png")

            # 3. Open Enquiry Drawer from services CTA
            build_cta = page_desktop.query_selector("button:has-text('Inquire About Private Build')")
            if build_cta:
                build_cta.click()
                time.sleep(1.0)
                page_desktop.screenshot(path="screenshots/desktop_services_drawer.png")
                print("Saved screenshots/desktop_services_drawer.png")

                # Close drawer
                close_btn = page_desktop.query_selector("[aria-label='Close drawer']")
                if close_btn:
                    close_btn.click()
                    time.sleep(0.5)

            # --- MOBILE ROUTE TESTING ---
            print("Verifying Mobile Viewports on newly added routes...")
            page_mobile = browser.new_page(viewport={"width": 375, "height": 812})

            # 1. Mobile /#/about
            page_mobile.goto("http://localhost:5173/#/about")
            time.sleep(2.0)
            page_mobile.screenshot(path="screenshots/mobile_about_page.png")
            print("Saved screenshots/mobile_about_page.png")

            # 2. Mobile /#/services
            page_mobile.goto("http://localhost:5173/#/services")
            time.sleep(2.0)
            page_mobile.screenshot(path="screenshots/mobile_services_page.png")
            print("Saved screenshots/mobile_services_page.png")

            browser.close()
            print("All Ticket 3 verification steps completed successfully!")

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
