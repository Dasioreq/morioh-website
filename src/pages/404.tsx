import { Link } from "react-router-dom";

export default function PathError() {
    return <>
        <h1>Page not found</h1>
        <p>Reload the page, check the link for errors, or go to the </p> <Link to = "/">Home page</Link>
    </>
}