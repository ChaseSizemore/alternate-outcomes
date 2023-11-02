import { streamToJson, getAverageSalary, handleWebsiteClick  } from "@/utils/utilityFunctions";

/**
 * jest-environment jsdom
 */



describe('streamToJson', () => {
    it('should convert a ReadableStream to a JSON object', async () => {
      const mockStream = new ReadableStream({
        start(controller) {
          controller.enqueue(new TextEncoder().encode('{"key":"value"}'));
          controller.close();
        },
      });
      
      const result = await streamToJson(mockStream);
      expect(result).toEqual({ key: 'value' });
    });
  
    it('should throw an error for invalid JSON', async () => {
      const mockStream = new ReadableStream({
        start(controller) {
          controller.enqueue(new TextEncoder().encode('invalid json'));
          controller.close();
        },
      });
      
      await expect(streamToJson(mockStream)).rejects.toThrow(SyntaxError);
    });
  });
  

  describe('getAverageSalary', () => {
    it('should calculate the average salary from an array of objects', () => {
      const salaries = [
        { salary: '1000' },
        { salary: '2000' },
        { salary: '3000' },
      ];
      const result = getAverageSalary(salaries);
      expect(result).toBe('$2,000');
    });
  
    it('should handle non-integer salary values', () => {
      const salaries = [
        { salary: '1000.99' },
        { salary: '2000.50' },
        { salary: '3000' },
      ];
      const result = getAverageSalary(salaries);
      expect(result).toBe('$2,000');
    });
  });
  

  // describe('handleWebsiteClick', () => {
  //   it('should open the bootcamp website in a new tab', () => {
  //     const mockBootcamp = {
  //       website: 'http://example.com',
  //       description: 'Test Bootcamp',
  //       averageSalary: '$2,000',
  //       name: 'Bootcamp',
  //     };
  
  //     const openSpy = jest.spyOn(window, 'open');
  //     handleWebsiteClick(mockBootcamp);
  //     expect(openSpy).toHaveBeenCalledWith('http://example.com', '_blank');
  //     openSpy.mockRestore();
  //   });
  // });
  
