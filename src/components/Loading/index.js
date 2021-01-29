import styled from 'styled-components';


const LoadingBase = styled.div`

background-image:url(${({ loadingGif }) => loadingGif});
flex:1;
height:100vh;
background-position: center;
background-size:cover;
width:100%;
@media screen and (max-width: 500px) {
        background-image:none;
        &:after{
            
            background-image:
        linear-gradient(transparent, ${({ theme }) => theme.colors.mainBg}),
        url(${({ loadingGif }) => loadingGif});
        height:100vh;
        content: "";
        display: block;
        position:absolute;
        background-position: center;
        background-size:cover;
        width:100%;
        }
        
}
`
export default function Loading({loadingGif}){

    return(
        <div>
            <LoadingBase loadingGif={loadingGif}/>
        </div>
    )
}

