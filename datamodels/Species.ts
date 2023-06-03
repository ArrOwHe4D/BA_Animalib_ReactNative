class Species 
{
  name: string;
  speciesType: string;
  animalCount: number;
  image: string;

  constructor(name: string, speciesType: string, animalCount: number, image: string) 
  {
    this.name = name;
    this.speciesType = speciesType;
    this.animalCount = animalCount;
    this.image = image;
  }
}

export default Species;