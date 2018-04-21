
const MODEL = {
  getVehicles: () =>{
    return `query	BuscaVeiculo ($page: Int, $limit: Int, $query: String ,$type: String){
      buscaVeiculo(page: $page, limit: $limit, query: $query ,type: $type){
        total

        pageInfo{

           hasPreviousPage
           hasNextPage
           pages
           page

         }

        edges{
          node {
                    _id
                    modelo
                    marca
                    ano_modelo
                    ano_fabricacao
                    combustivel
                    cor
                    usado
        }
        }
      }
    }`
  },



}
export default MODEL
