import logo from './logo.svg';
import './App.css';
import {LoginForm} from "./login/ui/LoginForm.tsx";
import {LoginRepositoryImpl} from "./login/repository/LoginRepositoryImpl.ts";
import {NetworkDataSourceImpl} from "./login/repository/datasource/network/NetworkDataSourceImpl.ts";
import {LocalDataSourceImpl} from "./login/repository/datasource/local/LocalDataSourceImpl.ts";
import {useLoginViewModel} from "./login/viewmodel/useLoginViewModel.ts";
import {LoginUseCase} from "./login/usecase/LoginUseCase.ts";

function App() {
    const loginViewModel = useLoginViewModel(new LoginUseCase(
        new LoginRepositoryImpl(new NetworkDataSourceImpl(), new LocalDataSourceImpl(localStorage))
    ));
    return (
        <>
            <LoginForm viewModel={loginViewModel}/>
        </>
    );
}

export default App;
