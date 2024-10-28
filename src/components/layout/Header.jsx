import { MoonIcon } from "lucide-react"

export default function Header() {
    return (
        <footer className="bg-stone-700">
            <div className="container">
                <MoonIcon size={25} strokeWidth={1.5} className="text-gray-300"/>
            </div>
        </footer>
    )
}