import { Toaster } from "react-hot-toast";
import { Sidebar } from "./components";
import { AuthContextProvider } from "./context";
import { QueryClient, QueryClientProvider } from "react-query";
import Pages from "./pages";
import "./assets/css/index.scss";

const client = new QueryClient();

const App = () =>{
    
	return (
		<QueryClientProvider client={client}>
			<AuthContextProvider>
				<div style={{ display: "flex" }}>
					<Sidebar />
					<div className='content'>
						<Pages />
						<Toaster />
					</div>
				</div>
			</AuthContextProvider>
		</QueryClientProvider>
	);
}

export default App;