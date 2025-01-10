import districtModel from '../models/operacion.distrito.js'
import GenericDB from './generic.db.js'

export default class DistritoDB extends GenericDB {
    constructor() {
        super(districtModel)
    }
}