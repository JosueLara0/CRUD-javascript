
    // Holders of info saved in localStorage
    let names = [];
    let models = [];
    let doorsNumber = [];
    let colours = [];
    let brands = [];

    // Pointers of SUBMIT and UPDATE buttons
    let updateFlag = false;
    let updateIndex = null;

    // Function to Load info in localStorage
    const localStorageSave = () => {
        localStorage.setItem("CarsNames", JSON.stringify(names));
        localStorage.setItem("CarsModels", JSON.stringify(models));
        localStorage.setItem("CarsDoors", JSON.stringify(doorsNumber));
        localStorage.setItem("CarsColours", JSON.stringify(colours));
        localStorage.setItem("CarsBrands", JSON.stringify(brands));
    };

    // Function to create the table
    const loadTable = () => {
        // Bring tbody from HTML
        let tbody = document.getElementById("carsList")

        //Reload the table, avoid duplicates
        tbody.innerHTML = "";

        // Create a tr with tds and buttons for each car
        for(let i=0; i<names.length; i++) {

            const row = document.createElement("tr");

            const name_td = document.createElement("td");
            const model_td = document.createElement("td");
            const doors_td = document.createElement("td");
            const colour_td = document.createElement("td");
            const brand_td = document.createElement("td");
            const updateBtn_td = document.createElement("td");
            const deleteBtn_td = document.createElement("td");

            const updateBtn = document.createElement("button");
            updateBtn.setAttribute("class", "update");
            updateBtn_td.appendChild(updateBtn);

            const deleteBtn = document.createElement("button");
            deleteBtn.setAttribute("class", "delete");
            deleteBtn_td.appendChild(deleteBtn);

            // Load inputs in tds
            name_td.innerText = names[i];
            model_td.innerText = models[i];
            doors_td.innerText = doorsNumber[i];
            colour_td.innerText = colours[i];
            brand_td.innerText = brands[i];
            updateBtn.innerText = "Update";
            deleteBtn.innerText = "Delete";

            // Actions for update/delete buttons
            updateBtn.addEventListener("click", () => updateCar(i, name_td, model_td, doors_td, colour_td, brand_td));
            deleteBtn.addEventListener("click", () => deleteCar(i));

            // Load tds in the row
            row.appendChild(name_td);
            row.appendChild(model_td);
            row.appendChild(doors_td);
            row.appendChild(colour_td);
            row.appendChild(brand_td);
            row.appendChild(updateBtn_td);
            row.appendChild(deleteBtn_td);

            // Load row in the table
            tbody.appendChild(row)
        }
    };

    // Function for SUBMIT button
    let submitBtn = document.getElementById("submitBtn");
    submitBtn.addEventListener("click", () => {

        // If name input is not empty, load the inputs. Else, send an alert.
        if (document.getElementById("name").value !== ""){

            // If is true, the element of the array will be replaced . Else, create a new element.
            if (updateFlag) {
                // updateIndex is the index saved in "Function for UPDATE button"
                names[updateIndex] = document.getElementById("name").value;
                models[updateIndex] = document.getElementById("model").value;
                doorsNumber[updateIndex] = document.getElementById("doors").value;
                colours[updateIndex] = document.getElementById("colour").value;
                brands[updateIndex] = document.getElementById("brand").value;

                updateFlag = false;
                updateIndex = null;
            } else {
                // Inputs loaded in arrays
                names.push(document.getElementById("name").value);
                models.push(document.getElementById("model").value);
                doorsNumber.push(document.getElementById("doors").value);
                colours.push(document.getElementById("colour").value);
                brands.push(document.getElementById("brand").value);
            }

            localStorageSave();
            loadTable();

            // Leave inputs slots empty.
            document.getElementById("carsForm").reset();

        } else {
            alert("You forgot to name the car");
          }
    });

    // Function for UPDATE button
    const updateCar = (i, name_td, model_td, doors_td, colour_td, brand_td) => {

        // Fill input slots with car info saved previously
        document.getElementById("name").value = name_td.innerText;
        document.getElementById("model").value = model_td.innerText;
        document.getElementById("doors").value = doors_td.innerText;
        document.getElementById("colour").value = colour_td.innerText;
        document.getElementById("brand").value = brand_td.innerText;

        updateFlag = true;
        updateIndex = i;
    };

    // Function for DELETE button
    const deleteCar = (i) => {
        names.splice(i, 1);
        models.splice(i, 1);
        doorsNumber.splice(i, 1);
        colours.splice(i, 1);
        brands.splice(i, 1);

        localStorageSave();
        loadTable();
    };


    // If the localStorage had info, it will be downloaded to the table. Else, will create and load empty arrays
    if (localStorage.getItem("CarsNames") != null){
        names = JSON.parse(localStorage.getItem("CarsNames"));
        models = JSON.parse(localStorage.getItem("CarsModels"));
        doorsNumber = JSON.parse(localStorage.getItem("CarsDoors"));
        colours = JSON.parse(localStorage.getItem("CarsColours"));
        brands = JSON.parse(localStorage.getItem("CarsBrands"));
        loadTable();

    } else {
        localStorageSave();
    }

