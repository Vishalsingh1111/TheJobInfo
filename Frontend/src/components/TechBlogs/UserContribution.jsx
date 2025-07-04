import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { baseUrl } from "../../Baseurl";
import Navbar from "../Navbar";
import { toast } from 'react-hot-toast';
import Breadcrumb from "../Common/Breadcrumb";
import Footer from "../Footer";

const FormElementInput = () => {
    const [formData, setFormData] = useState({
        id: "",
        header: "",
        code: "",
        explanation: "",
        code2: "",
        explanation2: "",
        code3: "",
        explanation3: "",
        image: "",
        category: ""
    });

    const navigate = useNavigate();

    const [validationErrors, setValidationErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const validateForm = () => {
        const requiredFields = ["id", "header", "code", "image", "category"];
        let errors = {};
        for (let field of requiredFields) {
            if (!formData[field]) {
                errors[field] = `${field.charAt(0).toUpperCase() + field.slice(1)} is required`;
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
            await axios.post(`${baseUrl}/blog`, formData, {
                headers: { "Content-Type": "application/json" }
            });
            toast.success('Thanks for Contributing!');
            setFormData({
                id: "",
                header: "",
                code: "",
                explanation: "",
                code2: "",
                explanation2: "",
                code3: "",
                explanation3: "",
                image: "",
                category: ""
            });
            setValidationErrors({});
            navigate("/Technical-Blog");
        } catch (error) {
            console.error("Error submitting content:", error);
            toast.error("Error: " + err.response.data.message);
        }
    };

    return (
        <>
            <Navbar />
            <Breadcrumb />
            <section className="mx-5 dark:bg-slate-900">
                <div className="mb-10">
                    <h1 className="text-center text-3xl text-gray-600 dark:text-white">Enter Required Details</h1>
                </div>
                <div className="container mx-auto p-10 rounded-xl my-10">
                    <form onSubmit={handleSubmit} className="flex flex-wrap -mx-4">
                        <DefaultColumn>
                            <DefaultInput1
                                value={formData.id}
                                onChange={handleChange}
                                error={validationErrors.id}
                            />
                        </DefaultColumn>

                        <DefaultColumn>
                            <DefaultInput5
                                value={formData.category}
                                onChange={handleChange}
                                error={validationErrors.category}

                            />
                        </DefaultColumn>

                        <DefaultColumn>
                            <DefaultInput6
                                value={formData.image}
                                onChange={handleChange}
                                error={validationErrors.image}
                            />
                        </DefaultColumn>

                        <DefaultColumn>
                            <DefaultInput2
                                value={formData.header}
                                onChange={handleChange}
                                error={validationErrors.header}
                            />
                        </DefaultColumn>
                        <DefaultColumn>
                            <DefaultInput3
                                value={formData.code}
                                onChange={handleChange}
                                error={validationErrors.code}
                            />
                        </DefaultColumn>
                        <DefaultColumn>
                            <DefaultInput4
                                value={formData.explanation}
                                onChange={handleChange}
                                error={validationErrors.explanation}
                            />
                        </DefaultColumn>
                        <DefaultColumn>
                            <DefaultInput7
                                value={formData.code2}
                                onChange={handleChange}
                                error={validationErrors.code2}
                            />
                        </DefaultColumn>
                        <DefaultColumn>
                            <DefaultInput8
                                value={formData.explanation2}
                                onChange={handleChange}
                                error={validationErrors.explanation2}
                            />
                        </DefaultColumn>
                        <DefaultColumn>
                            <DefaultInput9
                                value={formData.code3}
                                onChange={handleChange}
                                error={validationErrors.code3}
                            />
                        </DefaultColumn>
                        <DefaultColumn>
                            <DefaultInput10
                                value={formData.explanation3}
                                onChange={handleChange}
                                error={validationErrors.explanation3}
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
            <Footer />
        </>
    );
};

const DefaultColumn = ({ children }) => {
    return (
        <div className="w-full px-4 md:w-1/2 lg:w-1/3">
            <div className="mb-8">{children}</div>
        </div>
    );
};

const DefaultInput1 = ({ value, onChange, error }) => {
    return (
        <>
            <label className="block text-base font-medium text-gray-700 dark:text-gray-300 mb-2">
                Select - Any Number
                <span className="text-red-500">*</span>
            </label>
            <input
                type="number"
                name="id"
                value={value}
                onChange={onChange}
                placeholder="Enter ID"
                className={`w-full bg-white dark:bg-gray-700 rounded-md border border-gray-300 dark:border-gray-600 py-3 px-4 text-gray-700 dark:text-gray-300 outline-none transition duration-150 ease-in-out focus:border-red-500 dark:focus:border-red-400 focus:ring focus:ring-red-200 dark:focus:ring-red-900 ${error ? 'border-red-500' : ''}`}
            />
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        </>
    );
};

const DefaultInput5 = ({ value, onChange, error }) => {
    return (
        <>
            <label className="block text-base font-medium text-gray-700 dark:text-gray-300 mb-2">
                Category - use dsa
                <span className="text-red-500">*</span>
            </label>
            <textarea
                name="category"
                value={value}
                onChange={onChange}
                placeholder="dsa"
                rows={1}
                className={`w-full bg-white dark:bg-gray-700 rounded-md border border-gray-300 dark:border-gray-600 py-3 px-4 text-gray-700 dark:text-gray-300 outline-none transition duration-150 ease-in-out focus:border-red-500 dark:focus:border-red-400 focus:ring focus:ring-red-200 dark:focus:ring-red-900 resize-none ${error ? 'border-red-500' : ''}`}
            />
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        </>
    );
};

const DefaultInput6 = ({ value, onChange, error }) => {
    return (
        <>
            <label className="block text-base font-medium text-gray-700 dark:text-gray-300 mb-2">
                Image Link
                <span className="text-red-500">*</span>
            </label>
            <textarea
                name="image"
                value={value}
                onChange={onChange}
                placeholder="Image link"
                rows={1}
                className={`w-full bg-white dark:bg-gray-700 rounded-md border border-gray-300 dark:border-gray-600 py-3 px-4 text-gray-700 dark:text-gray-300 outline-none transition duration-150 ease-in-out focus:border-red-500 dark:focus:border-red-400 focus:ring focus:ring-red-200 dark:focus:ring-red-900 resize-none ${error ? 'border-red-500' : ''}`}
            />
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        </>
    );
};

const DefaultInput2 = ({ value, onChange, error }) => {
    return (
        <>
            <label className="block text-base font-medium text-gray-700 dark:text-gray-300 mb-2">
                Heading of Blog
                <span className="text-red-500">*</span>
            </label>
            <textarea
                name="header"
                value={value}
                onChange={onChange}
                placeholder="Enter heading"
                rows={4}
                className={`w-full bg-white dark:bg-gray-700 rounded-md border border-gray-300 dark:border-gray-600 py-3 px-4 text-gray-700 dark:text-gray-300 outline-none transition duration-150 ease-in-out focus:border-red-500 dark:focus:border-red-400 focus:ring focus:ring-red-200 dark:focus:ring-red-900 resize-none ${error ? 'border-red-500' : ''}`}
            />
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        </>
    );
};

const DefaultInput3 = ({ value, onChange, error }) => {
    return (
        <>
            <label className="block text-base font-medium text-gray-700 dark:text-gray-300 mb-2">
                Code
                <span className="text-red-500">*</span>
            </label>
            <textarea
                name="code"
                value={value}
                onChange={onChange}
                placeholder="Brute Force"
                rows={4}
                className={`w-full bg-white dark:bg-gray-700 rounded-md border border-gray-300 dark:border-gray-600 py-3 px-4 text-gray-700 dark:text-gray-300 outline-none transition duration-150 ease-in-out focus:border-red-500 dark:focus:border-red-400 focus:ring focus:ring-red-200 dark:focus:ring-red-900 resize-none ${error ? 'border-red-500' : ''}`}
            />
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        </>
    );
};

const DefaultInput4 = ({ value, onChange, error }) => {
    return (
        <>
            <label className="block text-base font-medium text-gray-700 dark:text-gray-300 mb-2">
                Enter Explanation
            </label>
            <textarea
                name="explanation"
                value={value}
                onChange={onChange}
                placeholder="Enter explanation"
                rows={4}
                className={`w-full bg-white dark:bg-gray-700 rounded-md border border-gray-300 dark:border-gray-600 py-3 px-4 text-gray-700 dark:text-gray-300 outline-none transition duration-150 ease-in-out focus:border-red-500 dark:focus:border-red-400 focus:ring focus:ring-red-200 dark:focus:ring-red-900 resize-none ${error ? 'border-red-500' : ''}`}
            />
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}


        </>
    );
};

const DefaultInput7 = ({ value, onChange, error }) => {
    return (
        <>
            <label className="block text-base font-medium text-gray-700 dark:text-gray-300 mb-2">
                Code
            </label>
            <textarea
                name="code2"
                value={value}
                onChange={onChange}
                placeholder="Better Approach"
                rows={4}
                className={`w-full bg-white dark:bg-gray-700 rounded-md border border-gray-300 dark:border-gray-600 py-3 px-4 text-gray-700 dark:text-gray-300 outline-none transition duration-150 ease-in-out focus:border-red-500 dark:focus:border-red-400 focus:ring focus:ring-red-200 dark:focus:ring-red-900 resize-none ${error ? 'border-red-500' : ''}`}
            />
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        </>
    );
};

const DefaultInput8 = ({ value, onChange, error }) => {
    return (
        <>
            <label className="block text-base font-medium text-gray-700 dark:text-gray-300 mb-2">
                Enter Explanation
            </label>
            <textarea
                name="explanation2"
                value={value}
                onChange={onChange}
                placeholder="Enter explanation"
                rows={4}
                className={`w-full bg-white dark:bg-gray-700 rounded-md border border-gray-300 dark:border-gray-600 py-3 px-4 text-gray-700 dark:text-gray-300 outline-none transition duration-150 ease-in-out focus:border-red-500 dark:focus:border-red-400 focus:ring focus:ring-red-200 dark:focus:ring-red-900 resize-none ${error ? 'border-red-500' : ''}`}
            />
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}


        </>
    );
};

const DefaultInput9 = ({ value, onChange, error }) => {
    return (
        <>
            <label className="block text-base font-medium text-gray-700 dark:text-gray-300 mb-2">
                Code
            </label>
            <textarea
                name="code3"
                value={value}
                onChange={onChange}
                placeholder="Best Approach"
                rows={4}
                className={`w-full bg-white dark:bg-gray-700 rounded-md border border-gray-300 dark:border-gray-600 py-3 px-4 text-gray-700 dark:text-gray-300 outline-none transition duration-150 ease-in-out focus:border-red-500 dark:focus:border-red-400 focus:ring focus:ring-red-200 dark:focus:ring-red-900 resize-none ${error ? 'border-red-500' : ''}`}
            />
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        </>
    );
};

const DefaultInput10 = ({ value, onChange, error }) => {
    return (
        <>
            <label className="block text-base font-medium text-gray-700 dark:text-gray-300 mb-2">
                Enter Explanation
            </label>
            <textarea
                name="explanation3"
                value={value}
                onChange={onChange}
                placeholder="Enter explanation"
                rows={4}
                className={`w-full bg-white dark:bg-gray-700 rounded-md border border-gray-300 dark:border-gray-600 py-3 px-4 text-gray-700 dark:text-gray-300 outline-none transition duration-150 ease-in-out focus:border-red-500 dark:focus:border-red-400 focus:ring focus:ring-red-200 dark:focus:ring-red-900 resize-none ${error ? 'border-red-500' : ''}`}
            />
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}


        </>
    );
};


export default FormElementInput;
