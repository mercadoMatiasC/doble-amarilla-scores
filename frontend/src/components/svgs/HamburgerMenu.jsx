export function HamburgerMenu({ onClick }) {
    return (
        <svg width="30" height="30" fill="white" viewBox="0 0 100 80" onClick={onClick} className="hover:cursor-pointer">
            <rect width="100" height="15" rx="8"></rect>
            <rect y="30" width="100" height="15" rx="8"></rect>
            <rect y="60" width="100" height="15" rx="8"></rect>
        </svg>
    )
}
