import {createRoot} from 'react-dom/client'
import {RouterProvider} from "react-router-dom";
import {QueryClient, QueryClientProvider} from "react-query";
import {ReactQueryDevtools} from 'react-query/devtools';
import {router} from "app/routes/route";

const queryClient = new QueryClient();

const reactRoot = createRoot(
    document.getElementById('root')!,
)

reactRoot.render(
    // <React.StrictMode>
    <QueryClientProvider client={queryClient}>
        <RouterProvider router={router}/>
        <ReactQueryDevtools initialIsOpen={false}/>
    </QueryClientProvider>
    // </React.StrictMode>
)
