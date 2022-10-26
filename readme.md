# lidarDjango

# csvLoader
 
5.2.1 Index&Readme.md
As a portal, the Index page mainly provides users with an intuitive impression of the web page and gives users a quick way to access each of the main functions of the site. To help users get started on the platform, we also designed a path to the user manual in index.



Figure 5.2  index.html(a)

When a Web page is opened, a Django-based server receives a request from the front end and calls a view file containing the information written in the routing file. The View file calls the HTML file in the template layer and returns it to the browser, which then renders the file.
The browser sends a GET request to the server via XMLHttpRequest() when loading the web interface, passing the file address data in text format to the server to invoke the file on the server.
After obtaining the corresponding file, the obtained text data is converted into the JSON format file that we can use based on the storage and expression format of file data. Then call pointCloudMaker function for point cloud rendering based on existing data, simply show some of the application's functions.
5.2.2 Preview&Loader


  

Figure 5.3  loader.html(a)&preview.html(b)

Preview. HTML and loader.html are two interfaces with similar functions. Their function is to provide users with a highly customized and easy to operate lidar point cloud visualization image display function.
When the button of loading the current file is clicked, the corresponding listening event function will be called, which obtains the current value in the corresponding part of the page and takes the value as a parameter, calls the file stored in the server or selected through the user upload file function to read, and converts the file content into a dictionary in JSON format. Pass the pointCloudMaker function along with the other arguments in the page. PointCloudMaker then models the incoming data based on the parameters passed in (such as the shading scheme of the point, the size of the point, etc.), and then passes in the resulting parameters such as the scene and camera, which are also passed into pointCloudMaker's. Then put it into the <canvas> box in html, so as to achieve the display of the model. When clicking the wheel cast button, the value of the file name in the control panel will be changed through a very simple timer cycle, and then the load file function will be automatically called to realize the wheel cast. Similarly, the interval of the function execution in the timer can also be customized by the user.
5.2.3 Show.html


Figure 5.4  show.html

The content in show.html is used to display the image after the visual fusion of multi-modal data. The page provides the user with a method to choose between several files in the library, and also supports the operation of rotation of files in the selected directory.
Its implementation is through the user in the browser to select the corresponding image address, and then use JavaScript AJAX to send POST request to the server, at the same time the address information in the form of dictionary as data to the back end. After receiving the corresponding POST request, the back end will immediately call the function in Radiate. py, and the multiple files corresponding to the input address will be called, and radiate is based on the Python script previously written to run, call calibration data on different dimensions of data time and space binding, And the created fusion image is stored in the static library for call. The front end loads and renders static images based on the returned JSON data after receiving the message that the back end has finished loading.
