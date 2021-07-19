// 아이디에 따라 페이지 다르게 해주는 것
import { useParams } from 'react-router-dom';

function ProductPage() {
    const { id } = useParams();
    return <h1>상품 상세 페이지 {id}번 상품</h1>
}

export default ProductPage;

//상품 상세 페이지