// LeftBar.jsx
import axios from 'axios';
import React, { useState, useEffect } from 'react';

const LeftBar = () => {
    const [quote, setQuote] = useState("");

    const fetchQuote = async () => {
        try {
            const res = await axios.get('https://api.quotable.io/random');
            setQuote(`${res.data.content} — ${res.data.author}`);
        } catch (error) {
            console.error("Error fetching quote:", error);
            setQuote("Inspiration comes from within.");
        }
    }

    useEffect(() => {
        fetchQuote();
    }, []);

    return (
        <div className="bg-gray-700 p-4 rounded border border-gray-600">
            <h3 className="text-green-400 mb-2">// Daily Inspiration</h3>
            <p className="text-gray-300 italic">{quote || 'Loading quote...'}</p>
            <div className="mt-4 p-2 bg-gray-800 rounded border border-gray-700">
                <h4 className="text-cyan-400 mb-1">// Code Snippet</h4>
                <pre className="text-xs text-gray-300">
{`print("peace")`}
                </pre>
            </div>
        </div>
    )
}

export default LeftBar;