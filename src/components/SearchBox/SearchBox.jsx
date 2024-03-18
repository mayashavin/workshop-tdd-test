import "./SearchBox.css";

export const SearchBox = ({ label, onChange, value = "", placeholder }) => {
    return (
        <div className="search-box">
            <label htmlFor="searchbox">{label}</label>
            <input
                type="text"
                placeholder={placeholder || "Search..."}
                id="searchbox"
                value={value}
                onChange={(e) => onChange(e.target.value)}
            />
        </div>
    )
}