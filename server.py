#!/usr/bin/env python3
"""Servidor local para hand-particles — PromoUPSA 2026."""

import http.server
import socketserver
import webbrowser
import os
import sys

PORT = 8080
DIR  = os.path.dirname(os.path.abspath(__file__))


class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIR, **kwargs)

    def end_headers(self):
        # Headers necesarios para SharedArrayBuffer / cámara en algunos browsers
        self.send_header("Cross-Origin-Opener-Policy", "same-origin")
        self.send_header("Cross-Origin-Embedder-Policy", "require-corp")
        self.send_header("Access-Control-Allow-Origin", "*")
        super().end_headers()

    def log_message(self, fmt, *args):
        print(f"  {self.address_string():>15}  {fmt % args}")


def main():
    url = f"http://localhost:{PORT}"

    print()
    print("  ╔══════════════════════════════╗")
    print("  ║   hand-particles             ║")
    print("  ║   PromoUPSA 2026             ║")
    print("  ╚══════════════════════════════╝")
    print(f"\n  Servidor → {url}")
    print("  Detener  → Ctrl+C\n")

    try:
        webbrowser.open(url)
    except Exception:
        pass

    socketserver.TCPServer.allow_reuse_address = True
    with socketserver.TCPServer(("", PORT), Handler) as httpd:
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\n  Servidor detenido.")
            sys.exit(0)


if __name__ == "__main__":
    main()
