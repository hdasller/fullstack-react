const MODEL = {
  getVehicles: () => {
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

  getTypes: (type) => {

    return `
    {
    __type(name: "${type}") {
      name
      enumValues {
        name
      }
    }
  }`
  },
  createVehicle: () => {
    return `mutation	CreateVeiculo ($data: VeiculoInput!){
    createVeiculo(data: $data)
  }`
  },
  updateVehicle: () => {
    return `mutation	UpdateVeiculo ($data: JSON! $id: ID!){
    updateVeiculo(data: $data, id: $id)
  }`
  },
  deleteVehicle: () => {
    return `mutation	DeleteVeiculo ( $id: ID!){
    deleteVeiculo( id: $id)
  }`
  }

}
export default MODEL
