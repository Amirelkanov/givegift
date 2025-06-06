import { useIdeas } from "../../../context/IdeasContext/IdeasContext";
import { ResultsError } from "../../../pages/Error/ResultsError/ResultsError";
import ProductsList from "../../ProductsList/ProductsList";
import { ProductsLoader } from "../../UI/Loader/ProductsLoader/ProductsLoader";


export const IdeasMainContent = () => {
    const { productIdeas, isIdeasLoading, ideaError } = useIdeas();
    let pageContent;

    if (isIdeasLoading) {
        pageContent = <ProductsLoader loadingText={"Придумываем идеи..."} />;
    } else if (ideaError) {
        pageContent = <ResultsError errorMsg={ideaError} />;
    } else {
        pageContent = <ProductsList products={productIdeas} />;
    }

    return pageContent;
}