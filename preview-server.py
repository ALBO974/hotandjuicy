"""Hot & Juicy local preview server.

Serves this project folder at http://127.0.0.1:8080 with no-cache headers
so every refresh shows your latest edits. Run it with start-preview.bat
(or: python preview-server.py).
"""
import http.server
import os
import socketserver

PORT = 8080
os.chdir(os.path.dirname(os.path.abspath(__file__)))


class Handler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header("Cache-Control", "no-cache, must-revalidate")
        self.send_header("Expires", "0")
        super().end_headers()

    def log_message(self, fmt, *args):
        print("[preview]", self.address_string(), fmt % args)


class Server(socketserver.ThreadingTCPServer):
    allow_reuse_address = True


if __name__ == "__main__":
    with Server(("127.0.0.1", PORT), Handler) as httpd:
        print(f"Hot & Juicy local preview running at http://127.0.0.1:{PORT}")
        print("Press Ctrl+C to stop.")
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\nStopped.")
