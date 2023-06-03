class Stopwatch 
{
    private startTime: number;
    private endTime: number;

    constructor() 
    {
      this.startTime = 0;
      this.endTime = 0;
    }
  
    start() 
    {
      this.startTime = new Date().getTime();
    }
  
    stop() 
    {
      this.endTime = new Date().getTime();
    }
  
    getElapsedTimeInMilliseconds(): number 
    {
      if (!this.startTime || !this.endTime) 
      {
        throw new Error('Stopwatch has not been started and stopped properly.');
      }
  
      return this.endTime - this.startTime;
    }
}

export default Stopwatch;