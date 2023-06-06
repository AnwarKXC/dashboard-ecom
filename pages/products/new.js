import ProductForm from "../../components/productForm";
import Layout from "../../components/Layout";
import Image from "next/image";

export default function NewProducs () {
   return (
      <Layout>
         <h1> New product </h1>
         <ProductForm />
      </Layout>
   );
}