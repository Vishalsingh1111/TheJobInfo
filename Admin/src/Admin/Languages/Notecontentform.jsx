import React, { useState } from "react";
import axios from "axios";
import { baseUrl } from "../../Baseurl";

const FormElementInput = () => {
    const [formData, setFormData] = useState({
        id: "",
        header: "",
        text: "",
        statement: "",
        substatement1: "",
        statement2: "",
        substatement2: "",
        statement3: "",
        substatement3: "",
        example: "",
        statement4: "",
        substatement4: "",
        code: "",
        explanation: "",
        statement5: "",
        substatement5: "",
        category: "",
        image: "",
        figtitle: ""
    });

    const [validationErrors, setValidationErrors] = useState({});

    const handleChange = (e) => {
        let { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const validateForm = () => {
        const requiredFields = ["id", "header", "text", "category"];
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
            await axios.post(`${baseUrl}/notecontent`, formData, {
                headers: { "Content-Type": "application/json" }
            });
            alert("New Card Created!");
            setFormData({
                id: "",
                header: "",
                text: "",
                statement: "",
                substatement1: "",
                statement2: "",
                substatement2: "",
                statement3: "",
                substatement3: "",
                example: "",
                statement4: "",
                substatement4: "",
                code: "",
                explanation: "",
                statement5: "",
                substatement5: "",
                category: "",
                image: "",
                figtitle: ""
            });
            setValidationErrors({});
        } catch (error) {
            console.error("Error submitting content:", error);
            alert("Error, Fill Required Details");
        }
    };

    return (
        <section className="mx-5 dark:bg-gray-800">
            <div className="mb-10">
                <h1 className="text-center text-3xl text-black">Enter Required Details</h1>
            </div>
            <div className="container mx-auto">
                <form onSubmit={handleSubmit} className="flex flex-wrap -mx-4">
                    {formFields.map((field, index) => (
                        <DefaultColumn key={index}>
                            <DefaultInput {...field} value={formData[field.name]} onChange={handleChange} error={validationErrors[field.name]} />
                        </DefaultColumn>
                    ))}
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

const formFields = [
    { label: "ID", name: "id", type: "number", required: true, placeholder: "Enter your ID" },
    { label: "Header", name: "header", type: "textarea", required: true, placeholder: "Enter the header" },
    { label: "Text", name: "text", type: "textarea", required: true, placeholder: "Enter the text" },
    { label: "Statement", name: "statement", type: "textarea", placeholder: "Enter the statement" },
    { label: "Substatement1", name: "substatement1", type: "textarea", placeholder: "Enter substatement1" },
    { label: "Statement2", name: "statement2", type: "textarea", placeholder: "Enter statement2" },
    { label: "Substatement2", name: "substatement2", type: "textarea", placeholder: "Enter substatement2" },
    { label: "Statement3", name: "statement3", type: "textarea", placeholder: "Enter statement3" },
    { label: "Substatement3", name: "substatement3", type: "textarea", placeholder: "Enter substatement3" },
    { label: "Example", name: "example", type: "textarea", placeholder: "Enter example" },
    { label: "Statement4", name: "statement4", type: "textarea", placeholder: "Enter statement4" },
    { label: "Substatement4", name: "substatement4", type: "textarea", placeholder: "Enter substatement4" },
    { label: "Code", name: "code", type: "textarea", rows: 4, placeholder: "Enter code" },
    { label: "Explanation", name: "explanation", type: "textarea", placeholder: "Enter explanation" },
    { label: "Statement5", name: "statement5", type: "textareat", placeholder: "Enter statement5" },
    { label: "Substatement5", name: "substatement5", type: "textarea", placeholder: "Enter substatement5" },
    { label: "Category", name: "category", type: "text", required: true, placeholder: "Enter category" },
    { label: "Image Link", name: "image", type: "text", placeholder: "Enter image link" },
    { label: "Figure Title", name: "figtitle", type: "text", placeholder: "Enter figure title" },
];

const DefaultColumn = ({ children }) => (
    <div className="w-full px-4 md:w-1/2 lg:w-1/3">
        <div className="mb-8">{children}</div>
    </div>
);

const DefaultInput = ({ label, name, type, value, onChange, placeholder, required, rows, error }) => (
    <>
        <label className="block text-base font-medium text-gray-700 dark:text-gray-300 mb-2">
            {label}{required && <span className="text-red-500">*</span>}
        </label>
        {type === "textarea" ? (
            <textarea
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                rows={rows}
                className="w-full bg-white dark:bg-gray-700 rounded-md border border-gray-300 dark:border-gray-600 py-3 px-4 text-gray-700 dark:text-gray-300 outline-none transition duration-150 ease-in-out focus:border-red-500 dark:focus:border-red-400 focus:ring focus:ring-red-200 dark:focus:ring-red-900 resize-none"
            />
        ) : (
            <input
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className="w-full bg-white dark:bg-gray-700 rounded-md border border-gray-300 dark:border-gray-600 py-3 px-4 text-gray-700 dark:text-gray-300 outline-none transition duration-150 ease-in-out focus:border-red-500 dark:focus:border-red-400 focus:ring focus:ring-red-200 dark:focus:ring-red-900"
            />
        )}
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
    </>
);

export default FormElementInput;
