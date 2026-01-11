import React, { useState } from "react";
import axios from "axios";
import { baseUrl } from "../../Baseurl";

const FormElementInput = () => {
    const [formData, setFormData] = useState({
        name: "",
        category: "",
        Problems: "",
        Topic: ""
    });

    const [validationErrors, setValidationErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const validateForm = () => {
        const requiredFields = ["name", "category"];
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
            await axios.post(`${baseUrl}/sheet`, formData, {
                headers: { "Content-Type": "application/json" }
            });
            alert("Card Created Successfully!");
            setFormData({
                name: "",
                category: "",
                Problems: "",
                Topic: ""
            });
            setValidationErrors({});
        } catch (error) {
            console.error("Error submitting note:", error);
            alert("Error submitting note.");
        }
    };

    return (
        <section className="mx-5 dark:bg-gray-800">
            <div className="mb-10"><h1 className="text-center text-3xl text-black">Enter Required Details</h1></div>
            <div className="container mx-auto border-2 p-10 rounded-xl">
                <form onSubmit={handleSubmit} className="flex flex-wrap -mx-4">
                    <DefaultColumn>
                        <DefaultInput
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            label="Enter Title"
                            type="text"
                            error={validationErrors.name}
                        />
                    </DefaultColumn>
                    <DefaultColumn>
                        <DefaultInput
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            label="Enter Category"
                            type="text"
                            error={validationErrors.category}
                        />
                    </DefaultColumn>
                    <DefaultColumn>
                        <DefaultInput
                            name="Problems"
                            value={formData.Problems}
                            onChange={handleChange}
                            label="Total No. of Problems"
                            type="number"
                            error={validationErrors.Problems}
                        />
                    </DefaultColumn>
                    <DefaultColumn>
                        <DefaultInput
                            name="Topic"
                            value={formData.Topic}
                            onChange={handleChange}
                            label="Topic"
                            type="text"
                            error={validationErrors.Topic}
                        />
                    </DefaultColumn>
                    <div className="w-full px-4 text-center">
                        <button type="submit" className="bg-red-500 shadow-lg hover:shadow-red-500/30 shadow-black/30 text-white py-3 px-10 rounded-md">
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
    const isRequired = name === "name" || name === "category";

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
