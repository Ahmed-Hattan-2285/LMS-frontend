import { useState } from "react";

export default function AddCoverForm({ id, addCover }) {
    const initialState = { url: "" };
    const [formData, setFormData] = useState(initialState);

    function handleChange(evt) {
        setFormData({ ...formData, [evt.target.name]: evt.target.value });
    }

    function handleSubmit(evt) {
        evt.preventDefault();
        addCover(id, formData);
        setFormData(initialState);
    }

    return (
        <>
            <h3>Add or change course cover</h3>
            <form onSubmit={handleSubmit} autoComplete="off">
                <p>
                    <label htmlFor="id_url">Cover URL:</label>
                    <input
                        value={formData.url}
                        type="text"
                        name="url"
                        id="id_url"
                        maxLength="250"
                        required
                        onChange={handleChange}
                    />
                </p>
                <button type="submit" className="btn submit">
                    Save Cover
                </button>
            </form>
        </>
    );
}