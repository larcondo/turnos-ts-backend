import ProfessionalModel, {
  IProfessional,
  omitTimestamps,
} from "@models/professional.model";
import { ICreateProfessionalDTO } from "@domain/Professional";
import { ProfessionalRepository } from "./professional.repository";

class DbProfessionalRepository implements ProfessionalRepository {
  async findAll(): Promise<IProfessional[]> {
    const ps = await ProfessionalModel.find({}, omitTimestamps);
    return ps;
  }
  async findById(id: string): Promise<IProfessional | null> {
    const ps = await ProfessionalModel.findById(id);
    if (!ps) return null;
    return ps;
  }
  async findByName(name: string): Promise<IProfessional | null> {
    const ps = await ProfessionalModel.findOne({ name });
    if (!ps) return null;
    return ps;
  }
  async create(professional: ICreateProfessionalDTO): Promise<IProfessional> {
    const ps = new ProfessionalModel({
      name: professional.name,
      position: professional.position,
    });
    await ps.save();
    return { name: ps.name, position: ps.position };
  }
}

export default DbProfessionalRepository;
