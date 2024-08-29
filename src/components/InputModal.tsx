import React, { useState } from 'react'
import { Formik, Field, Form, ErrorMessage } from 'formik'
import { toast } from 'react-toastify';
import { FormValues } from '../types/formvalues'
import * as Yup from 'yup';
import { saveNoteToLocalDb } from '../lib/db';
import { InputModalProps } from '../types/inputModalProps';
import { NoteProps } from '../types/note';

const InputModal : React.FC <InputModalProps> = ({ onNoteSave }) => {
    const [isOpen, setIsOpen] = useState(false);

    const openForm = () =>  setIsOpen(true);
    const closeForm = () => setIsOpen(false);

    const initialValues : FormValues = {
        title: '',
        summary: '',
        body: ''
    }

    const validationSchema = Yup.object({
        title: Yup.string().required('Title is required'),
        summary: Yup.string().required('Summary is required'),
        body: Yup.string().required('Cannot leave body blank')
    })
    const onSubmit = async (values: FormValues) => {

        const formData : NoteProps = {
            ...values,
            timestamp: new Date()
        };

        await saveNoteToLocalDb(formData);

        toast.success("Note saved successfully");
        onNoteSave(formData);
        setTimeout(() => {
            closeForm();
        }, 1500);
        console.log("Form data: ", formData);
    }

    return (
        <div className="relative">
            <button 
                onClick={openForm} 
                className="md:p-5 md:px-10 p-2 px-6 rounded-sm bg-purple-900 text-white hover:bg-purple-600 delay-100"
            >
                Add Note
            </button>

            {isOpen && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                <div className="relative max-w-md p-10 rounded-sm bg-gray-500">
                        <div className="flex flex-row items-center justify-center">
                            <div>
                                <button 
                                    onClick={closeForm} 
                                    className="absolute top-2 right-2 rounded-full bg-red-400 text-white p-2 px-4"
                                >
                                    X
                                </button>
                            </div>

                            <div className='flex flex-col'>
                                <span className="text-lg font-semibold text-white">Add note</span> 
                                <Formik
                                    initialValues={initialValues}
                                    validationSchema={validationSchema}
                                    onSubmit={onSubmit}
                                >
                                    {({ isSubmitting }) => (
                                        <Form>
                                            <div className='my-3 flex flex-col'>
                                                <label htmlFor="title" className='text-white font-medium'>Note Title</label>
                                                <Field
                                                    type="text"
                                                    id="title"
                                                    name="title"
                                                    className="border p-2 rounded"
                                                />
                                                <ErrorMessage 
                                                    name="title" 
                                                    component="div" 
                                                    className='text-red-500'/>
                                            </div>
                                            <div className='my-3 flex flex-col'>
                                                <label htmlFor="title" className='text-white font-medium'>Summary</label>
                                                <Field
                                                    type="text"
                                                    id="summary"
                                                    name="summary"
                                                    className="border p-2 rounded"
                                                />
                                                <ErrorMessage 
                                                    name="summary" 
                                                    component="div" 
                                                    className='text-red-500'/>
                                            </div>
                                            <div className='my-3 flex flex-col'>
                                                <label htmlFor="title" className='text-white font-medium'>Body</label>
                                                <Field
                                                    as="textarea"
                                                    rows={5}
                                                    cols={15}
                                                    id="body"
                                                    name="body"
                                                    className="border p-2 rounded"
                                                />
                                                <ErrorMessage 
                                                    name="body" 
                                                    component="div" 
                                                    className='text-red-500'/>
                                            </div>

                                            <button 
                                                type='submit' 
                                                disabled={isSubmitting} 
                                                className='w-full text-center p-2 px-6 rounded-sm text-white bg-blue-600 hover:bg-blue-400 delay-100'
                                            >
                                                {!isSubmitting ? "Save" : "Saving data..."}
                                            </button>
                                        </Form>
                                    )}
                                </Formik>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default InputModal