
import * as React from "react"
import { CloudUpload } from "lucide-react"
import { FileTrigger } from "./FileUploadTrigger"

export function FileUpload() {
    const [file, setFile] = React.useState<string | null>(null)

    return (
        <div className="w-full max-w-sm">
            <FileTrigger
                onSelect={(e) => {
                    const files = Array.from(e || [])
                    const filenames = files.map((file) => file.name)
                    setFile(filenames.join(", "))
                }}
            >
                <div className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <CloudUpload className="w-8 h-8 mb-3 text-gray-400" />
                        <p className="mb-2 text-sm text-gray-500"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                        <p className="text-xs text-gray-500">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                    </div>
                </div>
            </FileTrigger>
            {file && (
                <div className="mt-2 text-sm text-gray-700">
                    Selected: {file}
                </div>
            )}
        </div>
    )
}
