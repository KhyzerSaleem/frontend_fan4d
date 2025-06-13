import { CircleAlert } from 'lucide-react'
import React from 'react'

type FeedbackMessageProps = {
    children? : React.ReactNode
}

const FeedbackMessage = ({ children }: FeedbackMessageProps) => {
    if (!children) return null;
    return (
        <>
            <p className='text-red-500 text-center font-semibold flex justify-center items-center ' >
                <CircleAlert size={15} /> {children}
            </p>
        </>
    )
}

export default FeedbackMessage