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

            # --- 1. DESKTOP HOMEPAGE ---
            print("Verifying Desktop Viewport on /...")
            page_desktop = browser.new_page(viewport={"width": 1440, "height": 900})
            page_desktop.goto("http://localhost:5173/")
            time.sleep(2.0)  # Wait for animations and images to render

            # Capture full-page Desktop Homepage
            page_desktop.screenshot(path="screenshots/desktop_homepage.png", full_page=True)
            print("Saved screenshots/desktop_homepage.png")

            # Capture specific Hero Section
            page_desktop.screenshot(path="screenshots/desktop_hero.png")
            print("Saved screenshots/desktop_hero.png")

            # Scroll and capture featured properties
            elem_featured = page_desktop.query_selector("#collection")
            if elem_featured:
                elem_featured.scroll_into_view_if_needed()
                time.sleep(1.0)
                elem_featured.screenshot(path="screenshots/property_presentation_section.png")
                print("Saved screenshots/property_presentation_section.png")

            # --- 2. MOBILE HOMEPAGE ---
            print("Verifying Mobile Viewport on /...")
            page_mobile = browser.new_page(viewport={"width": 375, "height": 812})
            page_mobile.goto("http://localhost:5173/")
            time.sleep(2.0)

            # Capture Mobile Hero
            page_mobile.screenshot(path="screenshots/mobile_hero.png")
            print("Saved screenshots/mobile_hero.png")

            # Capture Full-Page Mobile Homepage
            page_mobile.screenshot(path="screenshots/mobile_homepage.png", full_page=True)
            print("Saved screenshots/mobile_homepage.png")

            browser.close()
            print("All Ticket 4 verification steps completed successfully!")

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
