import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Map from 'App/Models/Map'
import StoreMapValidator from 'App/Validators/StoreMapValidator'

export default class MapsController {
  public async index({}: HttpContextContract) {
    const mapsDB = await Map.all()
    return mapsDB
  }

  public async store({request, auth}: HttpContextContract) {
    const data = await request.validate(StoreMapValidator)
    const mapsDB = await Map.create({...data, userId: auth.user?.id})
    return mapsDB
  }

  public async show({params, response}: HttpContextContract) {
    try {
      const mapsDB = await Map.findOrFail(params.id)
      return mapsDB
    } catch (error) {
      response.status(400).send("Beatmap não encontrado")
    }
  }

  public async update({request, params, response}: HttpContextContract) {

    try {
      const mapsDB = await Map.findOrFail(params.id)
      const {map} = await request.validate(StoreMapValidator)
      // const mapsDB = await Map.create({...data, userId: auth.user?.id})
      mapsDB.map = map
      await mapsDB.save()
      return mapsDB

    } catch (error) {
      response.status(400).send("Beatmap não encontrado")
    }    
  }

  public async destroy({params, response}: HttpContextContract) {
    try {
      const mapsDB = await Map.findOrFail(params.id)
      await mapsDB.delete()
      return mapsDB

    } catch (error) {
      response.status(400).send("Beatmap não encontrado")
    }
  }
}
