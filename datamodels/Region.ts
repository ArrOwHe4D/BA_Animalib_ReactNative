class Region 
{
  name: string;
  size: string;
  speciesCount: number;
  image: string;

  constructor(name: string, size: string, speciesCount: number, image: string) 
  {
    this.name = name;
    this.size = size;
    this.speciesCount = speciesCount;
    this.image = image;
  }
}

export default Region;