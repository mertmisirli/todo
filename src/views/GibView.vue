<template>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/font/bootstrap-icons.css">

  <NavbarView :userInfo="userName" />

  <Toast />

  <div class="container">
    <div class="row">
      <!-- Authentication Part -->
      <div class="data-info col-12 mt-3 mb-5 rounded-3" style="max-height: 400px;">
        <!-- Token Main Part -->
        <div class="row mt-3 pb-3 ">
          <!-- Token Label -->
          <div class="col-3">
            <label for="input-token"><span class="pi pi-key "
                style="font-size: 1.5rem"></span><strong>Token</strong></label>
          </div>
          <!-- Token Input -->
          <div class="col-8">
            <textarea type="text" class="form-control token-back" id="input-token" v-model="token"
              placeholder="Token Girişi" style="max-height: 150px;"></textarea>
          </div>
        </div>

        <!-- Date and Buttons Main Part -->
        <div class="row mt-3 pb-3 d-flex justify-content-center align-items-center">
          <!-- Date Label -->
          <div class="col-3 ">
            <label for="request-date">
              <i class="pi pi-calendar mx-2" style="font-size: 1.5rem"></i><strong>Tarih</strong></label>
          </div>
          <!-- Date Input -->
          <div class="col-4 ">
            <input type="month" class="form-control w-100" id="request-date" placeholder="Tarih" v-model="date"
              onfocus="this.showPicker()" dateFormat="mm/yy">
          </div>
          <!-- Buttons -->
          <div class="col-5 ">
            <Button @click="getExcelFile" class="rounded-2" type="submit" label="İndir"
              style="height: 45px; background-image: linear-gradient( rgba(231, 154, 154, 0), rgb(28, 170, 196));"><i
                class='pi pi-fw pi-download mx-2'></i> İndir</Button>
            <Button @click="viewFile" class="rounded-2 mx-3 mt-sm-2" type="submit" label="Getir"
              style="height: 45px; background-color: rgba(231, 151, 70, 0.836);"><i class='pi pi-fw pi-list mx-2'></i>
              Getir</Button>
          </div>
        </div>
      </div>

      <!-- Content Part -->
      <div class=" col-12 content-part-out rounded-3 mt-1">
        <!-- Filter Part -->
        <div class=" col-12  mb-2">
          <p class="mt-2" style="font-size: 25px; color: rgb(255, 255, 255);">{{ this.selectedYear }}-{{
            this.selectedMonth }} GIB Kayıtları</p>
        </div>
        <div class="row justify-content-end">
          <!-- Filter Input Area  -->
          <div class="col-9">
            <input v-model="filterText" class="rounded-2 pt-1 pb-1 px-3 p-1" type="text"
              style="width: 100%; margin-top: 5px;" placeholder="Arama Yapın">
          </div>
          <div class="col-3 justify-content-end mt-1 ">
            <!-- Buttons -->

            <!-- <Button @click="filterData" class="rounded-2" type="submit" label="Filtre" style="height: 40px;" /> -->
            <Button @click="exportToExcel" class="rounded-2 mx-2 bg-success text-light" type="submit"
              label="Excel Aktarım" style="height: 40px;"><i class="pi pi-file-export mx-2"></i> Excel Aktarım</Button>
          </div>
        </div>

        <!-- Table Data Part -->
        <div class="content-part rounded-3 table-responsive mt-md-2 mt-1" style="height:450px;">
          <table class="table table-striped">
            <caption></caption>
            <thead>
              <tr>
                <th class="sticky-row bg-info">#</th>
                <th class="sticky-row bg-info">Banka Pos Vkn</th>
                <th class="sticky-row bg-info">Pos Üye İşyeri</th>
                <th class="sticky-row bg-info">Pos Banka Adı</th>
                <th class="sticky-row bg-info">Toplam</th>
              </tr>
            </thead>
            <tbody v-if="!isLoading">

              <tr v-for="(row, index) in paginatedRows" :key="index">
                <td>{{ index + 1 + ((page - 1) * rowCountPreferencePerPage) }}</td>
                <td>{{ row.posBankVkn }}</td>
                <td>{{ row.posMemberCompany }}</td>
                <td style="font-size: 14px;">{{ row.posBankName }}</td>
                <td>{{ row.sum }}</td>
              </tr>
            </tbody>
          </table>

          <!-- <ul>
            <li v-for="item in filteredItems" :key="item.id">{{ item.posBankName }}</li>
          </ul> -->
          <p v-if="paginatedRows.length == 0" class="d-flex justify-content-center" style="font-weight: bold;">Kayıt
            Bulunamadı</p>

          <div class="d-flex align-items-center justify-content-center" style="height: 65%;" v-if="isLoading">
            <i class="pi pi-spin pi-spinner" style="font-size: 2rem"></i>
            <!-- <i class="pi pi-spin pi-cog" style="font-size: 2rem"></i> -->
          </div>
        </div>


        <!-- Row Count Preferences -->
        <div class="row">
          <!-- Select Row Size -->
          <div class="col-5 my-2">
            <select class="form-select w-50 mx-2" aria-label="Default select example" v-model="rowCountPreferencePerPage">
              <option selected disabled>Satır Sayısı</option>
              <option value="25">25</option>
              <option value="50">50</option>
              <option value="100">100</option>
            </select>
            <!-- <Dropdown v-model="selectedCity" :options="cities" optionLabel="size" placeholder="Satır Sayısı Seçin"
              class="w-50 md:w-14rem" style="width: 150px;" /> -->
          </div>

          <!-- Current and Total Page -->
          <div class="col-2 d-flex align-items-center mt-2 content-part mb-2 rounded-1">
            <div class="mx-auto ">
              <span v-if="this.totalPages > 0" style="font-size: 16px; font-weight: bold;">{{ this.page
              }}/{{ this.totalPages }}</span>
            </div>
          </div>

          <!-- Navigation -->
          <div class="col-5" style="height: 55px;">
            <ul class="pagination mx-2 mt-2 mb-2 justify-content-end">
              <li class="page-item"><button class="page-link" @click="firstPage" :disabled="page === 1">&lt;&lt;</button>
              </li>
              <li class="page-item"><button class="page-link" @click="previousPage" :disabled="page === 1">&lt;</button>
              </li>
              <li class="page-item"><button class="page-link disabled" @click="previousPage">{{ this.page }}</button></li>

              <li class="page-item"><button class="page-link" @click="nextPage" :disabled="page === totalPages">></button>
              </li>
              <li class="page-item"><button class="page-link" @click="lastPage"
                  :disabled="page === totalPages">>></button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <hr class="">

    <div class="row mt-5">
      <div class=" col-12 rounded-3 content-part mb-3" style="background-color: rgb(202, 203, 204);">
        <p class="mt-2 rounded-2" style="font-size: 18px;">Geçmiş</p>

        <!-- History -->
        <ul style="list-style-type: disc; height: 450px; max-height: 600px;" class="mt-4 card ">
          <div class="mt-1">
            <li v-for="(row, index) in actionHistoryList" :key="index" class="">
              <div class="row mx-2">
                <div class="col-12">{{ row["message"] }}</div>
              </div>
              <hr>
            </li>
          </div>
        </ul>
      </div>

    </div>
  </div>
  <Footer />
</template>

<script>
import * as XLSX from 'xlsx';
import NavbarView from '../components/NavBar.vue'
import Calendar from 'primevue/calendar';
import Footer from '../components/Footer.vue'


export default {
  name: 'GibView',
  components: {
    NavbarView,
    Calendar
  },
  data() {
    return {
      page: 1,
      rowCountPreferencePerPage: 25,
      actionHistoryList: [],
      isLoading: false,
      userName: '',
      fileDownloadHistory: [],
      filterText: '',
      items: [],

    }
  },
  methods: {

    setLoading() {
      this.isLoading = true;
    },
    removeLoading() {
      this.isLoading = false;
    },

    getExcelFile() {
      if (!this.checkParamsFilled(this.token, this.date)) {
        this.showError('Token veya Tarih Bilgisi Eksik');
        return;
      }

      console.log("Date : " + this.date.substring(0, 4) + " " + this.date.substring(5, 7));

      const excel_request_data = {
        "date": this.date,
        "token": this.token
      };

      fetch(this.apiUrl + 'excel/getfile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(excel_request_data)
      })
        .then(response => response.blob())
        .then(blob => {
          const fileReader = new FileReader();

          const url = URL.createObjectURL(blob);
          const link = document.createElement('a');
          const year = this.date.substring(0, 4)
          const month = this.date.substring(5, 7);
          link.href = url;
          link.download = year + '-' + month + '-gib.xlsx'; // Dosya adını istediğin şekilde değiştirebilirsin
          link.click();



          fileReader.readAsArrayBuffer(blob);
          URL.revokeObjectURL(url);

          this.showSuccess(year + "-" + month + "-gib.xlsx indirildi.")
          this.actionHistoryList.unshift({
            icon: 'pi pi-fw pi-file-import',
            message: (year + '-' + month + '-gib.xlsx' + ' indirildi'),
          })

        })
        .catch(error => {
          console.error('Excel dosyasi indirme hatasi:', error);
        });
    },
    viewFile() {
      console.log("Selected row pref : " + parseInt(this.rowCountPreferencePerPage));

      if (!this.checkParamsFilled(this.token, this.date)) {
        this.showError('Token veya Tarih Bilgisi Eksik');
        return;
      }

      if (!this.checkDateValid(this.date)) {
        this.showError("Hatalı Tarih Seçimi")
        return;
      }

      this.isLoading = true;

      const excel_request_data = {
        "date": this.date,
        "token": this.token
      };

      fetch(this.apiUrl + 'gibpos/get-or-first-request-file', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(excel_request_data)
      })
        .then(response => response.json())
        .then(json => {


          const link = document.createElement('a');
          const year = this.date.substring(0, 4)
          const month = this.date.substring(5, 7);

          this.selectedYear = year;
          this.selectedMonth = month;

          console.log("Selected row pref : " + this.rowCountPreferencePerPage);

          // Bellekten URL'yi temizle

          console.log(json);
          this.responseList = json;
          this.items = this.responseList;

          if (this.rowCountPreferencePerPage !== NaN) {
            console.log("Per Page : " + this.responseList.length / parseInt(this.rowCountPreferencePerPage));
          }

          this.isLoading = false;

        })
        .catch(error => {
          console.error('Excel dosyasi indirme hatasi:', error);
        });

    },

    exportToExcel() {

      const worksheet = XLSX.utils.json_to_sheet(this.filteredItems);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Veriler');

      try {
        const year = this.date.substring(0, 4)
        const month = this.date.substring(5, 7);
        XLSX.writeFile(workbook, (year + "-" + month + "-gib.xlsx"));
        this.showSuccess((year + "-" + month + "-gib.xlsx Excel'e Aktarıldı"))

      } catch (error) {
        this.showError(error)
      }

    },
    checkParamsFilled(token, date) {
      if (token === undefined || token === '' || date === undefined) {
        return false;
      }
      return true;
    },
    checkDateValid(date) {
      var today = new Date();

      try {
        const year = parseInt(this.date.substring(0, 4))
        const month = parseInt(this.date.substring(5, 7));

        if (year > today.getFullYear() || month > (today.getMonth() + 1)) {
          return false;
        }

        return true;

      } catch (error) {
        return false;
      }
    },

    previousPage() {
      if (this.page > 1) {
        this.page--;
      }
    },
    nextPage() {
      if (this.page < this.totalPages) {
        this.page++;
      }
    },
    lastPage() {
      this.page = this.totalPages;
    },
    firstPage() {
      this.page = 1;
    }

  },
  computed: {
    totalPages() {
      if (!this.responseList) {
        return 0; // responseList tanımlı değilse boş bir dizi döndür
      }
      return Math.ceil(this.filteredItems.length / this.rowCountPreferencePerPage);
    },
    paginatedRows() {
      if (!this.responseList) {
        return []; // responseList tanımlı değilse boş bir dizi döndür
      } else if (this.items != []) {
        const startIndex = (this.page - 1) * this.rowCountPreferencePerPage;
        const endIndex = startIndex + this.rowCountPreferencePerPage;
        console.log("Start " + startIndex + " End " + endIndex);

        return this.filteredItems.slice(startIndex, endIndex);
      }

    },
    filteredItems() {
      if (!this.responseList) {
        return [];
      }
      return this.items.filter(item =>
        item.posBankName.toLowerCase().includes(this.filterText.toLowerCase())
      );
    }
  },
  mounted() {
    const data = this.$route.meta.data;
    this.userName = data['userInfo'];

  },
  created() {
  }
}
</script>


<script setup>
import { ref } from "vue";
import { inject } from 'vue';
import { useToast } from "primevue/usetoast";

// var rowCountPreferencePerPage = ref(); // Size of row that will be shown in per page

const date = ref();
const token = ref();

const toast = useToast();

const showSuccess = (message) => {
  toast.add({ severity: 'success', summary: 'Başarılı', detail: message, life: 3000 });
};

const showInfo = (message) => {
  toast.add({ severity: 'info', summary: 'Bilgi', detail: message, life: 3000 });
};

const showWarn = (message) => {
  toast.add({ severity: 'warn', summary: 'Uyarı', detail: message, life: 3000 });
};

const showError = (message) => {
  toast.add({ severity: 'error', summary: 'Hata', detail: message, life: 3000 });
};

</script>

<style>
.btn-groups Button {
  margin-left: 15px;
  height: 40px;
}

#excel-btn {
  text-align: center;
}

#excel-btn button {
  margin-left: 15px;
  color: p-button-primary;
}

.data-info {
  box-shadow: 1px 1px 6px 1px #888888;
  background-color: rgba(231, 226, 226, 0.737);
}

.content-part {
  background-color: rgba(237, 236, 236, 0.851);
  box-shadow: 2px 2px 5px 0px #888888
}

.content-part-out {
  background-color: rgba(156, 156, 156, 0.851);
  box-shadow: 2px 2px 5px 0px #888888
}

.sticky-row {
  position: sticky;
  top: 0;
  background-color: #e2b87d;
  /* İstediğiniz arka plan rengini burada belirtebilirsiniz */
  font-weight: bold;
  color: red;
}

.token-back {
  opacity: 50%;
}

.fade-enter-active tbody,
.fade-leave-active tbody {
  transition: opacity 0.5s;
}

.fade-enter tbody,
.fade-leave-to tbody {
  opacity: 0;
}

.faded {
  width: 100px;
  height: 100px;
  position: relative;
  animation-name: example;
  animation-duration: 4s;
  animation-iteration-count: infinite;

}


.table-cols ul li {}

.table-cols ul {}</style>