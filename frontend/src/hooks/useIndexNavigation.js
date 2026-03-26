import { useNavigate, useSearchParams } from "react-router-dom";

export function useIndexNavigation(basePath) {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const changePage = (page) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", page);
    navigate(`${basePath}?${params}`);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const query = new FormData(e.currentTarget).get("search");
    const newParams = new URLSearchParams(searchParams);

    query?newParams.set("search", query) : newParams.delete("search");
    newParams.set("page", 1);

    setSearchParams(newParams);
  };

  return { 
    searchParams, 
    changePage, 
    handleSearch 
  };
}