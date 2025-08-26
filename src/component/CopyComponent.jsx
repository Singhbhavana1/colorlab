import { Copy } from "lucide-react"
import { useState } from "react";

function CopyComponent({ copied }) {
    const [copy, setCopied] = useState()
    const handleCopy = () => {
        navigator.clipboard.writeText(copied);
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
    };
    return (
        <div className="flex flex-col">
            <button onClick={handleCopy} className="my-2 py-2 px-2 rounded-xl bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition"
            >
                <Copy className="w-4 h-4 text-gray-700 dark:text-gray-200" />
            </button>
                {copy && <span className="text-black dark:text-white text-xs">Copied!</span>}</div>
    )
}

export default CopyComponent