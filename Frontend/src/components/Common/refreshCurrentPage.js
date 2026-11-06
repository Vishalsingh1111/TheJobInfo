export default function refreshCurrentPage() {
    window.dispatchEvent(new Event("app:refresh-current-page"));
}
