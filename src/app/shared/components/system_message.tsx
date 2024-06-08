export function StatusDisplayBox({ http_status_code, detail_string }: { http_status_code: number, detail_string?: string }) {
    switch (http_status_code) {
        case 404:
            return (
                <div>
                    <code>404 - Requested Data not found</code>
                    <p>Test 404</p>
                    {
                        detail_string ? (<details>{detail_string}</details>) : null
                    }
                </div>
            );
        case 500:
            return (
                <div>
                    <code>500 - Internal Server Error</code>
                    <p>Test 500</p>
                    {
                        detail_string ? (<details>{detail_string}</details>) : null
                    }
                </div>
            );
        case 501:
            return (
                <div>
                    <code>501 - Not Implemented</code>
                    <p>Test 500</p>
                    {
                        detail_string ? (<details>{detail_string}</details>) : null
                    }
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