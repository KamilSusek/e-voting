export default interface ICRUDRepository {
  findAll(): any
  findById(id: number): any
  save(entity: any): any
  delete?(): any
}
