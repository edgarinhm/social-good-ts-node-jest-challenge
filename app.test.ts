import { loadFile } from './app';
import { Files } from './files';

// Mock the Files class
jest.mock('./files', () => {
  return {
    Files: jest.fn().mockImplementation(() => ({
      readFile: jest.fn(),
      createFile: jest.fn(),
    })),
  };
});

describe('App', () => {
  let mockFiles: jest.Mocked<Files>;

  beforeEach(() => {
    jest.clearAllMocks();
    mockFiles = new Files() as jest.Mocked<Files>;
  });

  describe('loadFile', () => {
    it('should replace version placeholder with script', async () => {
      // Arrange
      const originalContent = 'content with %version%';
      const expectedScript = `<script>
          let version = OTParser.GetVersion();
          let spanVersion = document.getElementById("version");
          spanVersion.textContent = version;
        </script>`;
      
      mockFiles.readFile.mockResolvedValue(originalContent);
      mockFiles.createFile.mockResolvedValue(expectedScript);

      // Act
      await loadFile(mockFiles);

      // Assert
      expect(mockFiles.readFile).toHaveBeenCalledWith('index.html');
      expect(mockFiles.createFile).toHaveBeenCalledWith(
        'index.html',
        originalContent.replace('%version%', expectedScript)
      );
    });

    it('should handle file read errors', async () => {
      // Arrange
      const error = new Error('File read error');
      mockFiles.readFile.mockRejectedValue(error);

      // Act & Assert
      await expect(loadFile(mockFiles)).rejects.toThrow('File read error');
    });

    it('should handle file write errors', async () => {
      // Arrange
      mockFiles.readFile.mockResolvedValue('some content');
      const error = new Error('File write error');
      mockFiles.createFile.mockRejectedValue(error);

      // Act & Assert
      await expect(loadFile(mockFiles)).rejects.toThrow('File write error');
    });
  });
});