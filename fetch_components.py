
import os
import requests

BASE_URL = "https://raw.githubusercontent.com/untitleduico/react/main/components/foundations/featured-icon"
TARGET_DIR = "boilerplate/src/components/ui"

COMPONENTS = [
    # Featured Icon
    ("featured-icon.tsx", "FeaturedIcon.tsx"),
]

def download_file(url, target_path):
    print(f"Downloading {url}...")
    try:
        response = requests.get(url)
        response.raise_for_status()
        
        # Ensure directory exists
        os.makedirs(os.path.dirname(target_path), exist_ok=True)
        
        with open(target_path, "w") as f:
            f.write(response.text)
        print(f"Saved to {target_path}")
    except Exception as e:
        print(f"Failed to download {url}: {e}")

if __name__ == "__main__":
    for remote_path, local_name in COMPONENTS:
        url = f"{BASE_URL}/{remote_path}"
        target = f"{TARGET_DIR}/{local_name}"
        download_file(url, target)
