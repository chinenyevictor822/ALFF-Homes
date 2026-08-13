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

            # --- 1. DESKTOP TICKET 2 VERIFICATION ---
            print("Verifying Desktop Viewport on /#/properties...")
            page_desktop = browser.new_page(viewport={"width": 1440, "height": 900})
            page_desktop.goto("http://localhost:5173/#/properties")
            time.sleep(2.0)  # Wait for animations and images to render

            # Capture properties directory main layout
            page_desktop.screenshot(path="screenshots/desktop_properties_page.png")
            print("Saved screenshots/desktop_properties_page.png")

            # Click "Request Private Tour" on the first card to trigger slide-over drawer
            print("Opening Enquiry Drawer...")
            tour_btn = page_desktop.query_selector("button:has-text('Request Private Tour')")
            if tour_btn:
                tour_btn.click()
                time.sleep(1.0)
                page_desktop.screenshot(path="screenshots/desktop_enquiry_drawer_open.png")
                print("Saved screenshots/desktop_enquiry_drawer_open.png")

                # Test Form Validation Errors
                print("Testing form validation errors...")
                submit_btn = page_desktop.query_selector("button:has-text('Compile Private Brief')")
                if submit_btn:
                    submit_btn.click()
                    time.sleep(0.5)
                    page_desktop.screenshot(path="screenshots/desktop_enquiry_validation_errors.png")
                    print("Saved screenshots/desktop_enquiry_validation_errors.png")

                    # Fill valid parameters
                    print("Filling valid form parameters...")
                    page_desktop.fill("#fullName", "Hon. Tarilah Lawson")
                    page_desktop.fill("#email", "tarilah@lawsongroup.ng")
                    page_desktop.fill("#phone", "+234 812 345 6789")
                    page_desktop.fill("#message", "Requesting an exclusive walkthrough next Tuesday at dawn.")
                    page_desktop.check("#consent")

                    # Click compile brief again
                    submit_btn.click()
                    time.sleep(1.0)
                    page_desktop.screenshot(path="screenshots/desktop_enquiry_success.png")
                    print("Saved screenshots/desktop_enquiry_success.png")

            # --- 2. MOBILE TICKET 2 VERIFICATION ---
            print("Verifying Mobile Viewport on /#/properties...")
            page_mobile = browser.new_page(viewport={"width": 375, "height": 812})
            page_mobile.goto("http://localhost:5173/#/properties")
            time.sleep(2.0)

            # Trigger Enquiry Drawer on Mobile
            mobile_tour_btn = page_mobile.query_selector("button:has-text('Request Private Tour')")
            if mobile_tour_btn:
                mobile_tour_btn.click()
                time.sleep(1.0)
                page_mobile.screenshot(path="screenshots/mobile_enquiry_drawer.png")
                print("Saved screenshots/mobile_enquiry_drawer.png")

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
