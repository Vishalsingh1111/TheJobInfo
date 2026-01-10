import React, { useState } from "react";
import axios from "axios";
import { baseUrl } from "../../Baseurl";

const FormElementInput = () => {
    const [formData, setFormData] = useState({
        id: "",
        link: "",
        name: "",
        category: "",
        title: "",
        price: "",
        image: ""
    });

    const [validationErrors, setValidationErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const validateForm = () => {
        const requiredFields = ["id", "name", "category", "title", "price"];
        let errors = {};
        for (let field of requiredFields) {
            if (!formData[field]) {
                errors[field] = `${field} is required`;
            }
        }
        setValidationErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        try {
            await axios.post(`${baseUrl}/note`, formData, {
                headers: { "Content-Type": "application/json" }
            });
            alert("Card Craeted Successfully!");
            setFormData({
                id: "",
                link: "",
                name: "",
                category: "",
                title: "",
                price: "",
                image: ""
            });
            setValidationErrors({});
        } catch (error) {
            console.error("Error submitting note:", error);
            alert("Error submitting note.");
        }
    };

    return (
        <section className="px-5 dark:bg-gray-800">
            <div className="mb-10">
                <h1 className="text-center text-3xl text-black">Enter Required Details</h1>
            </div>
            <div className="container mx-auto">
                <form onSubmit={handleSubmit} className="flex flex-wrap -mx-4">
                    <DefaultColumn>
                        <DefaultInput
                            name="id"
                            value={formData.id}
                            onChange={handleChange}
                            label="ID"
                            type="number"
                            error={validationErrors.id}
                        />
                    </DefaultColumn>
                    <DefaultColumn>
                        <DefaultInput
                            name="link"
                            value={formData.link}
                            onChange={handleChange}
                            label="Link"
                            type="text"
                            error={validationErrors.link}
                        />
                    </DefaultColumn>
                    <DefaultColumn>
                        <DefaultInput
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            label="Name"
                            type="text"
                            error={validationErrors.name}
                        />
                    </DefaultColumn>
                    <DefaultColumn>
                        <DefaultInput
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            label="Category"
                            type="text"
                            error={validationErrors.category}
                        />
                    </DefaultColumn>
                    <DefaultColumn>
                        <DefaultInput
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            label="Title"
                            type="text"
                            error={validationErrors.title}
                        />
                    </DefaultColumn>
                    <DefaultColumn>
                        <DefaultInput
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                            label="Price"
                            type="number"
                            error={validationErrors.price}
                        />
                    </DefaultColumn>
                    <DefaultColumn>
                        <DefaultInput
                            name="image"
                            value={formData.image}
                            onChange={handleChange}
                            label="Image Link"
                            type="text"
                            error={validationErrors.image}
                        />
                    </DefaultColumn>
                    <div className="w-full px-4 text-center">
                        <button type="submit" className="bg-red-500 shadow-lg hover:shadow-red-500/30 shadow-black/30  text-white py-3 px-10 rounded-md">
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </section>
    );
};

const DefaultColumn = ({ children }) => {
    return (
        <div className="w-full px-4 md:w-1/2 lg:w-1/3">
            <div className="mb-8">{children}</div>
        </div>
    );
};

const DefaultInput = ({ name, value, onChange, label, type, error }) => {
    const isRequired = name === "id" || name === "name" || name === "category" || name === "title" || name === "price";

    return (
        <>
            <label className="block text-base font-medium text-gray-700 dark:text-gray-300 mb-2">
                {label}{isRequired && <span className="text-red-500">*</span>}
            </label>
            <input
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={`Enter ${label.toLowerCase()}`}
                className="w-full bg-white dark:bg-gray-700 rounded-md border border-gray-300 dark:border-gray-600 py-3 px-4 text-gray-700 dark:text-gray-300 outline-none transition duration-150 ease-in-out focus:border-red-500 dark:focus:border-red-400 focus:ring focus:ring-red-200 dark:focus:ring-red-900"
            />
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        </>
    );
};

export default FormElementInput;
