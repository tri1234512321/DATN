/** @format */

import "./App.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

function App() {
    const queryClient = new QueryClient();
    return (
        <QueryClientProvider client={queryClient}>
            <div className='App'>
                <header className='App-header bg-blue-500 text-white p-4'>
                    <h1 className='text-4xl font-bold'>Hello, Tailwind CSS!</h1>
                    <p className='mt-2'>This is a simple example of using Tailwind CSS with React.</p>
                    <button className='mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700'>Click me</button>
                </header>
            </div>
        </QueryClientProvider>
    );
}

export default App;
