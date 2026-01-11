import React, { useState } from "react";
import axios from "axios";
import { baseUrl } from "../../Baseurl";

const FormElementInput = () => {
    const [formData, setFormData] = useState({
        name: "",
        article: "",
        Level: "",
        link: "",
        topic: "",
        id: "",
        companies: ""
    });

    const [validationErrors, setValidationErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const validateForm = () => {
        const requiredFields = ["name", "topic", "id"];
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
            await axios.post(`${baseUrl}/sheetproblem`, formData, {
                headers: { "Content-Type": "application/json" }
            });
            alert("Content Uploaded Successfully!");
            setFormData({
                name: "",
                article: "",
                Level: "",
                link: "",
                topic: "",
                id: "",
                companies: ""
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
            <div className="container mx-auto border-2 p-10 rounded-xl text-left">
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
                            name="article"
                            value={formData.article}
                            onChange={handleChange}
                            label="Article Link"
                            type="text"
                            error={validationErrors.article}
                        />
                    </DefaultColumn>
                    <DefaultColumn>
                        <DefaultInput
                            name="Level"
                            value={formData.Level}
                            onChange={handleChange}
                            label="Problem Difficulty Level"
                            type="text"
                            error={validationErrors.Level}
                        />
                    </DefaultColumn>
                    <DefaultColumn>
                        <DefaultInput
                            name="link"
                            value={formData.link}
                            onChange={handleChange}
                            label="leetcode Link"
                            type="text"
                            error={validationErrors.link}
                        />
                    </DefaultColumn>
                    <DefaultColumn>
                        <DefaultInput
                            name="topic"
                            value={formData.topic}
                            onChange={handleChange}
                            label="DSA (type)"
                            type="text"
                            error={validationErrors.topic}
                        />
                    </DefaultColumn>
                    <DefaultColumn>
                        <DefaultInput
                            name="companies"
                            value={formData.companies}
                            onChange={handleChange}
                            label="Companies"
                            type="text"
                            error={validationErrors.companies}
                        />
                    </DefaultColumn>
                    <DefaultColumn>
                        <DefaultInput
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            label="Problem Name"
                            type="text"
                            error={validationErrors.name}
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
    const isRequired = name === "name" || name === "topic" || name === "id";

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
