import os
import socket
import subprocess
import sys
import time


def is_port_open(port: int) -> bool:
    with socket.socket() as sock:
        return sock.connect_ex(("localhost", port)) == 0


def run_command(command: list[str], label: str) -> None:
    print(f"Running {label}...")
    result = subprocess.run(command, check=False)
    if result.returncode != 0:
        raise RuntimeError(f"{label} failed with exit code {result.returncode}")
    print(f"{label} passed.")


def wait_for_server(port: int, timeout_seconds: int = 15) -> None:
    deadline = time.time() + timeout_seconds
    while time.time() < deadline:
        if is_port_open(port):
            return
        time.sleep(0.5)
    raise RuntimeError(f"Vite development server did not start on port {port}.")


def run_browser_verification() -> None:
    from playwright.sync_api import sync_playwright

    os.makedirs("screenshots", exist_ok=True)
    dev_server = None

    try:
        dev_server = subprocess.Popen(
            ["npm", "run", "dev", "--", "--host", "127.0.0.1"],
            stdout=subprocess.PIPE,
            stderr=subprocess.STDOUT,
            text=True,
        )
        wait_for_server(5173)
        print("Vite development server started.")

        with sync_playwright() as playwright:
            browser = playwright.chromium.launch(headless=True)

            desktop = browser.new_page(viewport={"width": 1440, "height": 900})
            mobile = browser.new_page(viewport={"width": 375, "height": 812})

            # Ticket 4 homepage verification.
            desktop.goto("http://127.0.0.1:5173/#/", wait_until="networkidle")
            desktop.screenshot(path="screenshots/desktop_homepage.png", full_page=True)
            assert desktop.locator("h1").count() > 0, "Homepage hero heading is missing."
            assert desktop.get_by_text("Explore Collection").count() > 0, "Hero CTA is missing."
            assert desktop.get_by_text("Private Consultation").count() > 0, "Consultation CTA is missing."

            # Earlier-ticket routes must remain reachable.
            for route, marker in [
                ("#/properties", "The Living Collection"),
                ("#/about", "Our Philosophy"),
                ("#/services", "Services"),
                ("#/properties/obsidian-pavilion", "The Obsidian Pavilion"),
            ]:
                desktop.goto(f"http://127.0.0.1:5173/{route}", wait_until="networkidle")
                assert desktop.locator("body").inner_text().find(marker) >= 0, (
                    f"Expected marker '{marker}' was not found on {route}."
                )

            # Quick View must open and close with Escape.
            desktop.goto("http://127.0.0.1:5173/#/properties", wait_until="networkidle")
            quick_view = desktop.locator("button[aria-label^='Quick View']").first
            assert quick_view.count() == 1, "Quick View control is missing."
            quick_view.click()
            dialog = desktop.locator("[role='dialog']")
            assert dialog.count() == 1, "Quick View dialog did not open."
            desktop.keyboard.press("Escape")
            assert dialog.count() == 0, "Quick View dialog did not close with Escape."

            # Mobile-first verification.
            mobile.goto("http://127.0.0.1:5173/#/", wait_until="networkidle")
            mobile.screenshot(path="screenshots/mobile_homepage.png", full_page=True)
            assert mobile.locator("h1").count() > 0, "Mobile hero heading is missing."
            assert mobile.locator("body").evaluate("el => el.scrollWidth <= el.clientWidth"), (
                "Horizontal overflow detected on the mobile homepage."
            )

            browser.close()
            print("Browser verification passed on desktop and mobile.")
    finally:
        if dev_server is not None:
            dev_server.terminate()
            try:
                dev_server.wait(timeout=5)
            except subprocess.TimeoutExpired:
                dev_server.kill()


def main() -> None:
    try:
        run_command(["npm", "run", "build"], "Production build")
        run_command(["npm", "run", "lint"], "Lint")
        run_browser_verification()
        print("All ALFF Homes verification steps passed successfully.")
    except Exception as exc:
        print(f"Verification failed: {exc}")
        sys.exit(1)


if __name__ == "__main__":
    main()
