export function StatusDisplayBox({ http_status_code, detail_string }: { http_status_code: number, detail_string?: string }) {
    switch (http_status_code) {
        case 400:
            return (
                <div>
                    <details>
                        <summary>400 Bad Request</summary>
                        {detail_string}
                    </details>
                </div>
            );
        case 404:
            return (
                <div>
                    <details>
                        <summary>404 Not Found</summary>
                        {detail_string}
                    </details>
                </div>
            );
        case 500:
            return (
                <div>
                    <details>
                        <summary>500 Internal Server Error</summary>
                        {detail_string}
                    </details>
                </div>
            );
        case 501:
            return (
                <div>
                    <details>
                        <summary>501 Not Implemented</summary>
                        {detail_string}
                    </details>
                </div>
            );

        default:
            return (
                <div>
                    <code>[ERROR] Invalid HTTP-Status Code!</code>
                    <p>Use HTTP-Status Codes From <a target="_blank" href="https://developer.mozilla.org/en-US/docs/Web/HTTP/Status">https://developer.mozilla.org/en-US/docs/Web/HTTP/Status</a></p>
                </div>
            );
    }
}