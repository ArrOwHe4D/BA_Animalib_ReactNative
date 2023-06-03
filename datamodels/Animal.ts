class Animal 
{
  id: number;
  name: string;
  height: string;
  weight: string;
  species: string;
  regions: string;
  description: string;
  image: string;

  constructor(id: number, name: string, height: string, weight: string, species: string, regions: string, description: string, image: string) 
  {
    this.id = id;
    this.name = name;
    this.height = height;
    this.weight = weight;
    this.species = species;
    this.regions = regions;
    this.description = description;
    this.image = image;
  }
}

export default Animal;