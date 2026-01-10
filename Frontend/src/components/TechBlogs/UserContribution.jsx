// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import { baseUrl } from "../../Baseurl";
// import Navbar from "../Navbar";
// import { toast } from 'react-hot-toast';
// import Breadcrumb from "../Common/Breadcrumb";
// import Footer from "../Footer";

// const FormElementInput = () => {
//     const [formData, setFormData] = useState({
//         id: "",
//         header: "",
//         code: "",
//         explanation: "",
//         code2: "",
//         explanation2: "",
//         code3: "",
//         explanation3: "",
//         image: "",
//         category: ""
//     });

//     const navigate = useNavigate();

//     const [validationErrors, setValidationErrors] = useState({});

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData({ ...formData, [name]: value });
//     };

//     const validateForm = () => {
//         const requiredFields = ["id", "header", "code", "image", "category"];
//         let errors = {};
//         for (let field of requiredFields) {
//             if (!formData[field]) {
//                 errors[field] = `${field.charAt(0).toUpperCase() + field.slice(1)} is required`;
//             }
//         }
//         setValidationErrors(errors);
//         return Object.keys(errors).length === 0;
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         if (!validateForm()) {
//             return;
//         }

//         try {
//             await axios.post(`${baseUrl}/blog`, formData, {
//                 headers: { "Content-Type": "application/json" }
//             });
//             toast.success('Thanks for Contributing!');
//             setFormData({
//                 id: "",
//                 header: "",
//                 code: "",
//                 explanation: "",
//                 code2: "",
//                 explanation2: "",
//                 code3: "",
//                 explanation3: "",
//                 image: "",
//                 category: ""
//             });
//             setValidationErrors({});
//             navigate("/Technical-Blog");
//         } catch (error) {
//             console.error("Error submitting content:", error);
//             toast.error("Error: " + err.response.data.message);
//         }
//     };

//     return (
//         <>
//             <Navbar />
//             <Breadcrumb />
//             <section className="mx-5 dark:bg-slate-900">
//                 <div className="mb-10">
//                     <h1 className="text-center text-3xl text-gray-600 dark:text-white">Enter Required Details</h1>
//                 </div>
//                 <div className="container mx-auto p-10 rounded-xl my-10">
//                     <form onSubmit={handleSubmit} className="flex flex-wrap -mx-4">
//                         <DefaultColumn>
//                             <DefaultInput1
//                                 value={formData.id}
//                                 onChange={handleChange}
//                                 error={validationErrors.id}
//                             />
//                         </DefaultColumn>

//                         <DefaultColumn>
//                             <DefaultInput5
//                                 value={formData.category}
//                                 onChange={handleChange}
//                                 error={validationErrors.category}

//                             />
//                         </DefaultColumn>

//                         <DefaultColumn>
//                             <DefaultInput6
//                                 value={formData.image}
//                                 onChange={handleChange}
//                                 error={validationErrors.image}
//                             />
//                         </DefaultColumn>

//                         <DefaultColumn>
//                             <DefaultInput2
//                                 value={formData.header}
//                                 onChange={handleChange}
//                                 error={validationErrors.header}
//                             />
//                         </DefaultColumn>
//                         <DefaultColumn>
//                             <DefaultInput3
//                                 value={formData.code}
//                                 onChange={handleChange}
//                                 error={validationErrors.code}
//                             />
//                         </DefaultColumn>
//                         <DefaultColumn>
//                             <DefaultInput4
//                                 value={formData.explanation}
//                                 onChange={handleChange}
//                                 error={validationErrors.explanation}
//                             />
//                         </DefaultColumn>
//                         <DefaultColumn>
//                             <DefaultInput7
//                                 value={formData.code2}
//                                 onChange={handleChange}
//                                 error={validationErrors.code2}
//                             />
//                         </DefaultColumn>
//                         <DefaultColumn>
//                             <DefaultInput8
//                                 value={formData.explanation2}
//                                 onChange={handleChange}
//                                 error={validationErrors.explanation2}
//                             />
//                         </DefaultColumn>
//                         <DefaultColumn>
//                             <DefaultInput9
//                                 value={formData.code3}
//                                 onChange={handleChange}
//                                 error={validationErrors.code3}
//                             />
//                         </DefaultColumn>
//                         <DefaultColumn>
//                             <DefaultInput10
//                                 value={formData.explanation3}
//                                 onChange={handleChange}
//                                 error={validationErrors.explanation3}
//                             />
//                         </DefaultColumn>



//                         <div className="w-full px-4 text-center">
//                             <button type="submit" className="bg-red-500 shadow-lg hover:shadow-red-500/30 shadow-black/30  text-white py-3 px-10 rounded-md">
//                                 Submit
//                             </button>
//                         </div>
//                     </form>
//                 </div>
//             </section>
//             <Footer />
//         </>
//     );
// };

// const DefaultColumn = ({ children }) => {
//     return (
//         <div className="w-full px-4 md:w-1/2 lg:w-1/3">
//             <div className="mb-8">{children}</div>
//         </div>
//     );
// };

// const DefaultInput1 = ({ value, onChange, error }) => {
//     return (
//         <>
//             <label className="block text-base font-medium text-gray-700 dark:text-gray-300 mb-2">
//                 Select - Any Number
//                 <span className="text-red-500">*</span>
//             </label>
//             <input
//                 type="number"
//                 name="id"
//                 value={value}
//                 onChange={onChange}
//                 placeholder="Enter ID"
//                 className={`w-full bg-white dark:bg-gray-700 rounded-md border border-gray-300 dark:border-gray-600 py-3 px-4 text-gray-700 dark:text-gray-300 outline-none transition duration-150 ease-in-out focus:border-red-500 dark:focus:border-red-400 focus:ring focus:ring-red-200 dark:focus:ring-red-900 ${error ? 'border-red-500' : ''}`}
//             />
//             {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
//         </>
//     );
// };

// const DefaultInput5 = ({ value, onChange, error }) => {
//     return (
//         <>
//             <label className="block text-base font-medium text-gray-700 dark:text-gray-300 mb-2">
//                 Category - use dsa
//                 <span className="text-red-500">*</span>
//             </label>
//             <textarea
//                 name="category"
//                 value={value}
//                 onChange={onChange}
//                 placeholder="dsa"
//                 rows={1}
//                 className={`w-full bg-white dark:bg-gray-700 rounded-md border border-gray-300 dark:border-gray-600 py-3 px-4 text-gray-700 dark:text-gray-300 outline-none transition duration-150 ease-in-out focus:border-red-500 dark:focus:border-red-400 focus:ring focus:ring-red-200 dark:focus:ring-red-900 resize-none ${error ? 'border-red-500' : ''}`}
//             />
//             {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
//         </>
//     );
// };

// const DefaultInput6 = ({ value, onChange, error }) => {
//     return (
//         <>
//             <label className="block text-base font-medium text-gray-700 dark:text-gray-300 mb-2">
//                 Image Link
//                 <span className="text-red-500">*</span>
//             </label>
//             <textarea
//                 name="image"
//                 value={value}
//                 onChange={onChange}
//                 placeholder="Image link"
//                 rows={1}
//                 className={`w-full bg-white dark:bg-gray-700 rounded-md border border-gray-300 dark:border-gray-600 py-3 px-4 text-gray-700 dark:text-gray-300 outline-none transition duration-150 ease-in-out focus:border-red-500 dark:focus:border-red-400 focus:ring focus:ring-red-200 dark:focus:ring-red-900 resize-none ${error ? 'border-red-500' : ''}`}
//             />
//             {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
//         </>
//     );
// };

// const DefaultInput2 = ({ value, onChange, error }) => {
//     return (
//         <>
//             <label className="block text-base font-medium text-gray-700 dark:text-gray-300 mb-2">
//                 Heading of Blog
//                 <span className="text-red-500">*</span>
//             </label>
//             <textarea
//                 name="header"
//                 value={value}
//                 onChange={onChange}
//                 placeholder="Enter heading"
//                 rows={4}
//                 className={`w-full bg-white dark:bg-gray-700 rounded-md border border-gray-300 dark:border-gray-600 py-3 px-4 text-gray-700 dark:text-gray-300 outline-none transition duration-150 ease-in-out focus:border-red-500 dark:focus:border-red-400 focus:ring focus:ring-red-200 dark:focus:ring-red-900 resize-none ${error ? 'border-red-500' : ''}`}
//             />
//             {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
//         </>
//     );
// };

// const DefaultInput3 = ({ value, onChange, error }) => {
//     return (
//         <>
//             <label className="block text-base font-medium text-gray-700 dark:text-gray-300 mb-2">
//                 Code
//                 <span className="text-red-500">*</span>
//             </label>
//             <textarea
//                 name="code"
//                 value={value}
//                 onChange={onChange}
//                 placeholder="Brute Force"
//                 rows={4}
//                 className={`w-full bg-white dark:bg-gray-700 rounded-md border border-gray-300 dark:border-gray-600 py-3 px-4 text-gray-700 dark:text-gray-300 outline-none transition duration-150 ease-in-out focus:border-red-500 dark:focus:border-red-400 focus:ring focus:ring-red-200 dark:focus:ring-red-900 resize-none ${error ? 'border-red-500' : ''}`}
//             />
//             {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
//         </>
//     );
// };

// const DefaultInput4 = ({ value, onChange, error }) => {
//     return (
//         <>
//             <label className="block text-base font-medium text-gray-700 dark:text-gray-300 mb-2">
//                 Enter Explanation
//             </label>
//             <textarea
//                 name="explanation"
//                 value={value}
//                 onChange={onChange}
//                 placeholder="Enter explanation"
//                 rows={4}
//                 className={`w-full bg-white dark:bg-gray-700 rounded-md border border-gray-300 dark:border-gray-600 py-3 px-4 text-gray-700 dark:text-gray-300 outline-none transition duration-150 ease-in-out focus:border-red-500 dark:focus:border-red-400 focus:ring focus:ring-red-200 dark:focus:ring-red-900 resize-none ${error ? 'border-red-500' : ''}`}
//             />
//             {error && <p className="text-red-500 text-sm mt-2">{error}</p>}


//         </>
//     );
// };

// const DefaultInput7 = ({ value, onChange, error }) => {
//     return (
//         <>
//             <label className="block text-base font-medium text-gray-700 dark:text-gray-300 mb-2">
//                 Code
//             </label>
//             <textarea
//                 name="code2"
//                 value={value}
//                 onChange={onChange}
//                 placeholder="Better Approach"
//                 rows={4}
//                 className={`w-full bg-white dark:bg-gray-700 rounded-md border border-gray-300 dark:border-gray-600 py-3 px-4 text-gray-700 dark:text-gray-300 outline-none transition duration-150 ease-in-out focus:border-red-500 dark:focus:border-red-400 focus:ring focus:ring-red-200 dark:focus:ring-red-900 resize-none ${error ? 'border-red-500' : ''}`}
//             />
//             {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
//         </>
//     );
// };

// const DefaultInput8 = ({ value, onChange, error }) => {
//     return (
//         <>
//             <label className="block text-base font-medium text-gray-700 dark:text-gray-300 mb-2">
//                 Enter Explanation
//             </label>
//             <textarea
//                 name="explanation2"
//                 value={value}
//                 onChange={onChange}
//                 placeholder="Enter explanation"
//                 rows={4}
//                 className={`w-full bg-white dark:bg-gray-700 rounded-md border border-gray-300 dark:border-gray-600 py-3 px-4 text-gray-700 dark:text-gray-300 outline-none transition duration-150 ease-in-out focus:border-red-500 dark:focus:border-red-400 focus:ring focus:ring-red-200 dark:focus:ring-red-900 resize-none ${error ? 'border-red-500' : ''}`}
//             />
//             {error && <p className="text-red-500 text-sm mt-2">{error}</p>}


//         </>
//     );
// };

// const DefaultInput9 = ({ value, onChange, error }) => {
//     return (
//         <>
//             <label className="block text-base font-medium text-gray-700 dark:text-gray-300 mb-2">
//                 Code
//             </label>
//             <textarea
//                 name="code3"
//                 value={value}
//                 onChange={onChange}
//                 placeholder="Best Approach"
//                 rows={4}
//                 className={`w-full bg-white dark:bg-gray-700 rounded-md border border-gray-300 dark:border-gray-600 py-3 px-4 text-gray-700 dark:text-gray-300 outline-none transition duration-150 ease-in-out focus:border-red-500 dark:focus:border-red-400 focus:ring focus:ring-red-200 dark:focus:ring-red-900 resize-none ${error ? 'border-red-500' : ''}`}
//             />
//             {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
//         </>
//     );
// };

// const DefaultInput10 = ({ value, onChange, error }) => {
//     return (
//         <>
//             <label className="block text-base font-medium text-gray-700 dark:text-gray-300 mb-2">
//                 Enter Explanation
//             </label>
//             <textarea
//                 name="explanation3"
//                 value={value}
//                 onChange={onChange}
//                 placeholder="Enter explanation"
//                 rows={4}
//                 className={`w-full bg-white dark:bg-gray-700 rounded-md border border-gray-300 dark:border-gray-600 py-3 px-4 text-gray-700 dark:text-gray-300 outline-none transition duration-150 ease-in-out focus:border-red-500 dark:focus:border-red-400 focus:ring focus:ring-red-200 dark:focus:ring-red-900 resize-none ${error ? 'border-red-500' : ''}`}
//             />
//             {error && <p className="text-red-500 text-sm mt-2">{error}</p>}


//         </>
//     );
// };


// export default FormElementInput;


import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { baseUrl } from "../../Baseurl";
import Navbar from "../Navbar";
import { toast } from 'react-hot-toast';
import Breadcrumb from "../Common/Breadcrumb";
import Footer from "../Footer";
import { Send, FileText, Code, Lightbulb, Rocket, Award, CheckCircle, AlertCircle, ArrowRight, ArrowLeft } from "lucide-react";

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
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [currentStep, setCurrentStep] = useState(0);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        if (validationErrors[name]) {
            setValidationErrors({ ...validationErrors, [name]: null });
        }
    };

    const validateStep = (step) => {
        let errors = {};

        if (step === 0) {
            if (!formData.id) errors.id = "ID is required";
            if (!formData.header) errors.header = "Header is required";
            if (!formData.category) errors.category = "Category is required";
            if (!formData.image) errors.image = "Image URL is required";
        } else if (step === 1) {
            if (!formData.code) errors.code = "Brute force code is required";
        }

        setValidationErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleNext = () => {
        if (validateStep(currentStep)) {
            setCurrentStep(currentStep + 1);
        } else {
            toast.error('Please fill in required fields');
        }
    };

    const handleBack = () => {
        setCurrentStep(currentStep - 1);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateStep(0) || !validateStep(1)) {
            toast.error('Please fill in all required fields');
            return;
        }

        setIsSubmitting(true);

        try {
            await axios.post(`${baseUrl}/blog`, formData, {
                headers: { "Content-Type": "application/json" }
            });
            toast.success('Contribution submitted successfully! 🎉');
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
            setCurrentStep(0);
            setTimeout(() => {
                navigate("/Technical-Blog");
            }, 1500);
        } catch (error) {
            console.error("Error submitting content:", error);
            toast.error(error.response?.data?.message || "Error submitting your blog");
        } finally {
            setIsSubmitting(false);
        }
    };

    const steps = [
        { icon: <FileText className="w-6 h-6" />, title: "Basic Info", color: "from-blue-500 to-cyan-500" },
        { icon: <Lightbulb className="w-6 h-6" />, title: "Brute Force", color: "from-red-500 to-orange-500" },
        { icon: <Rocket className="w-6 h-6" />, title: "Better", color: "from-yellow-500 to-amber-500" },
        { icon: <Award className="w-6 h-6" />, title: "Optimal", color: "from-green-500 to-emerald-500" }
    ];

    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-gradient-to-br from-gray-50 via-purple-50/30 to-pink-50/30 dark:from-gray-950 dark:via-purple-950/10 dark:to-pink-950/10 py-12">
                <Breadcrumb />
                <div className="container mx-auto px-4 max-w-5xl">
                    {/* Header */}
                    <div className="text-center mb-12">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border border-gray-300 dark:border-gray-700 shadow-lg mb-6">
                            <Code className="w-4 h-4 text-purple-500" />
                            <span className="text-sm font-bold text-transparent bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text">
                                Contribute Solution
                            </span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-4">
                            Share Your
                            <span className="text-transparent bg-gradient-to-r from-red-500 via-purple-500 to-pink-500 bg-clip-text"> Knowledge</span>
                        </h1>
                        <p className="text-lg text-gray-600 dark:text-gray-400">
                            Help others learn by contributing your DSA solutions
                        </p>
                    </div>

                    {/* Progress Steps */}
                    <div className="mb-12">
                        <div className="flex items-center justify-between max-w-3xl mx-auto">
                            {steps.map((step, index) => (
                                <React.Fragment key={index}>
                                    <div className="flex flex-col items-center">
                                        <div className={`relative w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-300 ${index <= currentStep
                                            ? `bg-gradient-to-br ${step.color} text-white shadow-lg scale-110`
                                            : 'bg-gray-200 dark:bg-gray-800 text-gray-400'
                                            }`}>
                                            {index < currentStep ? (
                                                <CheckCircle className="w-8 h-8" />
                                            ) : (
                                                step.icon
                                            )}
                                        </div>
                                        <p className={`mt-2 text-xs font-bold ${index <= currentStep ? 'text-gray-900 dark:text-white' : 'text-gray-400'
                                            }`}>
                                            {step.title}
                                        </p>
                                    </div>
                                    {index < steps.length - 1 && (
                                        <div className={`flex-1 h-1 mx-4 rounded-full transition-all duration-300 ${index < currentStep
                                            ? `bg-gradient-to-r ${step.color}`
                                            : 'bg-gray-200 dark:bg-gray-800'
                                            }`}></div>
                                    )}
                                </React.Fragment>
                            ))}
                        </div>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit}>
                        {/* Step 0 - Basic Info */}
                        {currentStep === 0 && (
                            <div className="animate-fadeIn">
                                <StepCard
                                    icon={<FileText className="w-8 h-8" />}
                                    title="Basic Information"
                                    color="from-blue-500 to-cyan-500"
                                >
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <InputField
                                            label="Problem ID"
                                            name="id"
                                            type="number"
                                            placeholder="Enter unique number"
                                            value={formData.id}
                                            onChange={handleChange}
                                            error={validationErrors.id}
                                            required
                                        />
                                        <InputField
                                            label="Category"
                                            name="category"
                                            placeholder="e.g., dsa"
                                            value={formData.category}
                                            onChange={handleChange}
                                            error={validationErrors.category}
                                            required
                                        />
                                    </div>
                                    <InputField
                                        label="Image URL"
                                        name="image"
                                        placeholder="https://example.com/image.png"
                                        value={formData.image}
                                        onChange={handleChange}
                                        error={validationErrors.image}
                                        required
                                    />
                                    <TextareaField
                                        label="Problem Title"
                                        name="header"
                                        placeholder="Enter problem statement"
                                        rows={3}
                                        value={formData.header}
                                        onChange={handleChange}
                                        error={validationErrors.header}
                                        required
                                    />
                                </StepCard>
                            </div>
                        )}

                        {/* Step 1 - Brute Force */}
                        {currentStep === 1 && (
                            <div className="animate-fadeIn">
                                <ApproachStep
                                    icon={<Lightbulb className="w-8 h-8" />}
                                    title="Brute Force Approach"
                                    color="from-red-500 to-orange-500"
                                    badge="Basic Solution"
                                    codeField={{
                                        name: "code",
                                        value: formData.code,
                                        onChange: handleChange,
                                        error: validationErrors.code,
                                        required: true
                                    }}
                                    explanationField={{
                                        name: "explanation",
                                        value: formData.explanation,
                                        onChange: handleChange
                                    }}
                                />
                            </div>
                        )}

                        {/* Step 2 - Better Approach */}
                        {currentStep === 2 && (
                            <div className="animate-fadeIn">
                                <ApproachStep
                                    icon={<Rocket className="w-8 h-8" />}
                                    title="Better Approach"
                                    color="from-yellow-500 to-amber-500"
                                    badge="Improved Solution"
                                    codeField={{
                                        name: "code2",
                                        value: formData.code2,
                                        onChange: handleChange
                                    }}
                                    explanationField={{
                                        name: "explanation2",
                                        value: formData.explanation2,
                                        onChange: handleChange
                                    }}
                                />
                            </div>
                        )}

                        {/* Step 3 - Optimal Solution */}
                        {currentStep === 3 && (
                            <div className="animate-fadeIn">
                                <ApproachStep
                                    icon={<Award className="w-8 h-8" />}
                                    title="Optimal Solution"
                                    color="from-green-500 to-emerald-500"
                                    badge="Best Solution"
                                    codeField={{
                                        name: "code3",
                                        value: formData.code3,
                                        onChange: handleChange
                                    }}
                                    explanationField={{
                                        name: "explanation3",
                                        value: formData.explanation3,
                                        onChange: handleChange
                                    }}
                                />
                            </div>
                        )}

                        {/* Navigation Buttons */}
                        <div className="flex items-center justify-between mt-8">
                            {currentStep > 0 ? (
                                <button
                                    type="button"
                                    onClick={handleBack}
                                    className="flex items-center gap-2 px-6 py-3 rounded-xl bg-white dark:bg-gray-900 text-gray-900 dark:text-white border-2 border-gray-200 dark:border-gray-800 font-bold hover:shadow-lg transition-all duration-300"
                                >
                                    <ArrowLeft className="w-5 h-5" />
                                    Back
                                </button>
                            ) : (
                                <div></div>
                            )}

                            {currentStep < 3 ? (
                                <button
                                    type="button"
                                    onClick={handleNext}
                                    className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold shadow-lg hover:shadow-xl transition-all duration-300 ml-auto"
                                >
                                    Next
                                    <ArrowRight className="w-5 h-5" />
                                </button>
                            ) : (
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="flex items-center gap-3 px-8 py-4 rounded-xl bg-gradient-to-r from-green-500 to-emerald-500 text-white font-bold shadow-xl hover:shadow-2xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed ml-auto"
                                >
                                    {isSubmitting ? (
                                        <>
                                            <div className="w-5 h-5 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
                                            Submitting...
                                        </>
                                    ) : (
                                        <>
                                            <Send className="w-5 h-5" />
                                            Submit Solution
                                        </>
                                    )}
                                </button>
                            )}
                        </div>
                    </form>
                </div>
            </div>
            <Footer />
        </>
    );
};

// Step Card Component
const StepCard = ({ icon, title, color, children }) => (
    <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-xl overflow-hidden">
        <div className={`bg-gradient-to-r ${color} p-6 text-white`}>
            <div className="flex items-center gap-3">
                {icon}
                <h2 className="text-2xl font-black">{title}</h2>
            </div>
        </div>
        <div className="p-6 space-y-6">
            {children}
        </div>
    </div>
);

// Approach Step Component
const ApproachStep = ({ icon, title, color, badge, codeField, explanationField }) => (
    <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-xl overflow-hidden">
        <div className={`bg-gradient-to-r ${color} p-6 text-white`}>
            <div className="flex items-center gap-3 mb-2">
                {icon}
                <h2 className="text-2xl font-black">{title}</h2>
            </div>
            <p className="text-white/90">{badge}</p>
        </div>
        <div className="p-6 space-y-6">
            <TextareaField
                label="Code Solution"
                name={codeField.name}
                placeholder="Paste your code here..."
                rows={10}
                value={codeField.value}
                onChange={codeField.onChange}
                error={codeField.error}
                required={codeField.required}
            />
            <TextareaField
                label="Explanation (Optional)"
                name={explanationField.name}
                placeholder="Explain your approach..."
                rows={5}
                value={explanationField.value}
                onChange={explanationField.onChange}
            />
        </div>
    </div>
);

// Input Field Component
const InputField = ({ label, name, type = "text", placeholder, value, onChange, error, required }) => (
    <div className="space-y-2">
        <label className="block text-sm font-bold text-gray-900 dark:text-white">
            {label} {required && <span className="text-red-500">*</span>}
        </label>
        <input
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className={`w-full px-4 py-3 rounded-xl border-2 ${error ? 'border-red-500' : 'border-gray-200 dark:border-gray-800'
                } bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:border-purple-500 transition-all`}
        />
        {error && (
            <div className="flex items-center gap-2 text-red-500 text-sm">
                <AlertCircle className="w-4 h-4" />
                {error}
            </div>
        )}
    </div>
);

// Textarea Field Component
const TextareaField = ({ label, name, placeholder, rows = 4, value, onChange, error, required }) => (
    <div className="space-y-2">
        <label className="block text-sm font-bold text-gray-900 dark:text-white">
            {label} {required && <span className="text-red-500">*</span>}
        </label>
        <textarea
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            rows={rows}
            className={`w-full px-4 py-3 rounded-xl border-2 ${error ? 'border-red-500' : 'border-gray-200 dark:border-gray-800'
                } bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:border-purple-500 transition-all resize-none`}
        />
        {error && (
            <div className="flex items-center gap-2 text-red-500 text-sm">
                <AlertCircle className="w-4 h-4" />
                {error}
            </div>
        )}
    </div>
);

export default FormElementInput;