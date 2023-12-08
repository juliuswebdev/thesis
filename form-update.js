// Import the Supabase client

// Replace 'YOUR_SUPABASE_URL' and 'YOUR_SUPABASE_KEY' with your Supabase project URL and API key
const supabaseUrl = 'https://hzyiqzmdkocpumguttzb.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh6eWlxem1ka29jcHVtZ3V0dHpiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDA1Mzc5OTMsImV4cCI6MjAxNjExMzk5M30.-JNHzAkpBh_EN99ZiYGbu1q4ZsRSE3WapgBRMPrkiZs';

// Create a Supabase client
const database = supabase.createClient(supabaseUrl, supabaseKey);

// Function to check the connection status and show an alert
async function checkConnection() {
  try {
    // Try to make a request to Supabase to check the connection
    //let { data, error } = await database.from('testing').select().eq('id', userData.id).limit(1).single();
    var { data, error } = await database.from('testing').select(` 
      *,
      kalusuganBuntis ( * ),
      kalusuganPWD ( * ),
      miyembro ( * ),
      nutrisyon ( * ),
      pangkabuhayan ( * ),
      panlipunan ( * )
    `).eq('id', userData.id).limit(1).single();

    console.log(data);

    const eMiyembro = data.miyembro[data.miyembro.length-1];

    $('#fullname').val(eMiyembro.pinuno);
    $('#completeAdd').val(eMiyembro.nakatira);
    $('#relations').val(eMiyembro.sinoka);
    $('#houseNum').val(eMiyembro.bahayNumero);
    $('#birthD').val(eMiyembro.isinilang);
    $(`.member-gender-box [value="${eMiyembro.kasarian}"]`).prop('checked',true);
    $(`input[name="isEmployee"][value="${eMiyembro.Employed}"]`).prop('checked',true);
    $('#sitio').val(parseInt(eMiyembro.Sitio));
    $('#purok').val(parseInt(eMiyembro.Purok));

    eMiyembro.Family_members.forEach((member,key) => {
        let famAddBlock = `
      
        <!-- Container -->
      
        <div class="input-box member family-member ">   

                                              <label>Family member </label>
                                              <input type="text" placeholder="Member" name="fmember${key+1}" value="${member.member}" required/>
                            <div class="column">
                                              <input type="date" placeholder="Date of birth" name="fbday${key+1}" value="${member.bday}" required/>
                                              <input type="number" placeholder="Age" name="fage${key+1}" value="${member.age}" required/>
                                              <select name="frelation${key+1}" class="select-box" required>
                                                <option hidden>Member Relation</option>
                                                <option value="GrandMother">GrandMother</option>
                                                <option value="GrandFather">GrandFather</option>
                                                <option value="Mother">Mother</option>
                                                <option value="Father">Father</option>
                                                <option value="Husband">Husband</option>
                                                <option value="Wife">Wife</option>
                                                <option value="Son">Son</option>
                                                <option value="Daughter">Daughter</option>
                                                <option value="Uncle">Uncle</option>
                                                <option value="Auntie">Auntie</option>
                                                <option value="Nephew">Nephew</option>
                                                <option value="Niece">Niece</option>
                                                <option value="Grandchild">Grandchild</option>
                                                <option value="Cousin">Cousin</option>
                                              </select>
                                        <div class="select-box">
                                                      <select name="fcivilstatus${key+1}" required>
                                                        <option hidden>Civil Status</option>
                                                        <option value="Single" ${member.civilStat === 'Single' ? 'selected':''}>Single</option>
                                                        <option value="Married" ${member.civilStat === 'Married' ? 'selected':''}>Married</option>
                                                        <option value="Widowed" ${member.civilStat === 'Widowed' ? 'selected':''}>Widowed</option>
                                                      </select>
                                        </div>
                         </div>
        
                      <div class="column">
                            <input type="text" placeholder="Religion" name="religion" required/>
                            <select name="feducation${key+1}" class="select-box" value="${member.edAttain}" required>
                              <option hidden>Educational Attainment</option>
                              <option value="Elementary" ${member.edAttain === 'Elementary' ? 'selected':''}>Elementary</option>
                              <option value="JuniorHigh" ${member.edAttain === 'JuniorHigh' ? 'selected':''}>JuniorHigh</option>
                              <option value="SeniorHigh" ${member.edAttain === 'SeniorHigh' ? 'selected':''}>SeniorHigh</option>
                              <option value="College" ${member.edAttain === 'College' ? 'selected':''}>College</option>
                            </select>
                            <input type="text" placeholder="Source of income/Work" value="${member.sourceIncome}" name="fincome${key+1}" required/>
                            <div class="select-box">
                              <select name="fgender${key+1}" value="${member.genderPick}">
                                <option hidden>Gender</option>
                                <option value="Female" ${member.genderPick === 'Female' ? 'selected':''}>Female</option>
                                <option value="Male" ${member.genderPick === 'Male' ? 'selected':''}>Male</option>
                                <option value="Prefer_not_to_say" ${member.genderPick === 'Prefer_not_to_say' ? 'selected':''}>Prefer not to say</option>
                              </select>
                            </div>
                      </div>
                      
                      <div class="column">
                              <input type="number" placeholder="Years of staying in the area" name="fyears${key+1}" value="${member.stay}" required/>
                              <input type="text" placeholder="Philhealth(optional)" name="fphilid${key+1}" value="${member.philId}" />
                            <div class="select-box">
                              <select name="fmonthlyincome${key+1}" value="${member.incomePick}">
                                <option hidden>Monthly income</option>
                                <option value="5k-10k">5k-10k</option>
                                <option value="15k-25k">15k-25k</option>
                                <option value="30k+">30k+</option>
                              </select>
                            </div>
                          <div class="checkbox">
                            <label><input type="checkbox" value="isEmployee" name="isEmployee"> Employed</label>
                          </div>
               </div> 
       
            `;
        $('.memContainer').append(famAddBlock);

        
    });

    const ePangkabuhayan = data.pangkabuhayan[data.pangkabuhayan.length-1];

    $('#lupa').val(ePangkabuhayan.LupangKinatatayuan);
    $('#bahayz').val(ePangkabuhayan.BahaynaTinitirhan);
    $('#upahan').val(ePangkabuhayan.LupangSakahanPinagyayaman);
    $('#basura').val(ePangkabuhayan.ParaanPagtataponngBasura);
    $('#luto').val(ePangkabuhayan.GamitnaEnerhiyasaPagluluto);
    $('#tubig').val(ePangkabuhayan.PinagkukunanngTubig);
    $('#dumi').val(ePangkabuhayan.UringPalikuran);
    $('#kuryente').val(ePangkabuhayan.PinagmumulanngElektrisidad);
    $('#sasakyan').val(ePangkabuhayan.sasakyan);
    $('#agrikultura').val(ePangkabuhayan.KasangkapangpangAgrukultura);
    $('#poultry').val(ePangkabuhayan.PangKomersiyo);
    
    JSON.parse(ePangkabuhayan.MgaKasangkapansaBahay).forEach((kasangkapan)=> {
        $(`[value="${kasangkapan}"]`).prop("checked",true);
    });

    const eNutrisyon = data.nutrisyon[data.nutrisyon.length-1];

    //console.log(JSON.parse(eNutrisyon.Family_members[0]));

    eNutrisyon.Family_members.forEach((nut,key)=> {
        let famAddBlock = `<div class="input-box member family-member">
            <label>Pangalan ${key+1}</label>
            <div class="column">
            <input type="text" placeholder="Member" name="nmember${key+1}" value="${nut.member}"/>
            <input type="date" placeholder="Kapanganakan" name="nkapanganakan${key+1}" value="${nut.kapanganakan}"/>
            </div>
            <div class="column">
              <input type="number" placeholder="Gulang sa buwan" name="ngulang${key+1}" value="${nut.gulang}"/>
              <input type="text" placeholder="Timbang " name="ntimbang${key+1}" value="${nut.timbang}" />
              <input type="text" placeholder="Imunisasyon" name="nimunisasyon${key+1}" value="${nut.imunisasyon}" />
              <input type="text" placeholder="Nasagawa"  name="nnasagawa${key+1}" value="${nut.nasagawa}"/>
            </div>
          </div>`;

        $('.form3Container').append(famAddBlock);
    });

    const ePWD = data.kalusuganPWD[data.kalusuganPWD.length-1];


    ePWD.Family_members.forEach((pwd,key)=> {
        let famAddBlock = `
            <div class="input-box member family-member">
                <label>Pangalan ${key+1}</label>
                <div class="column">
                
                <input type="text" placeholder="Member" name="pwdmember${key+1}" value="${pwd.member}"    />
                <input type="date" placeholder="Kapanganakan"  name="pwdkapanganakan${key+1}" value="${pwd.kapanganakan}"  />
                </div>
                <div class="column">
                    <input type="number" placeholder="Edad" name="pwdedad${key+1}" value="${pwd.edad}"  />
                    <input type="text" placeholder="Kapansanan" name="pwdkapansanan${key+1}"  value="${pwd.kapansanan}" />
                    <div class="select-box">
                    <select name="pwdkasarian${key+1}">
                        <option hidden>Kasarian</option>
                        <option>Babae</option>
                        <option>Lalaki</option>
                        <option>Iba pa</option>
                    </select>
                </div> 
            </div>
            `;

        $('.form4Container').append(famAddBlock);
    });

    const eBuntis = data.kalusuganBuntis[data.kalusuganBuntis.length-1];

    $('#kabuuan').val(eBuntis.MagAsawangNagsasama);
    $('#pagbubuntis').val(eBuntis.BilangngIpinagbuntis);
    $('#balak').val(eBuntis.MayBalakpaMaganak);
    $('#nagpapagamot').val(eBuntis.Nagpapagamot);
    $('#kalagayan').val(eBuntis.Kalagayan);
    
    JSON.parse(eBuntis.FPmethod).forEach((fpp)=> {
        $(`input[type="checkbox"][value="${fpp}"]`).prop('checked',true);
    });


    const ePanlipunan = data.panlipunan[data.panlipunan.length-1];

    console.log(JSON.parse(ePanlipunan.Pambarangay));

    JSON.parse(ePanlipunan.Pambarangay).forEach((bar)=> {
        console.log(bar);
        let famAddBlock1 = `<div class="col-6">
            <input type="text" placeholder=""  class="pambaranggay" value="${bar}" />
        </div>`;

        $('.f62').append(famAddBlock1);
    });
    JSON.parse(ePanlipunan.Pambayan).forEach((bay)=> {
        let famAddBlock2 = `<div class="col-6">
            <input type="text" placeholder=""  class="pambayan" value="${bay}" />
        </div>`;

        $('.f63').append(famAddBlock2);
    });
    JSON.parse(ePanlipunan.SamahangKinasaniban).forEach((sam)=> {
        let famAddBlock3 = `<div class="col-6">
            <input type="text" placeholder=""  class="organisasyon" value="${sam}" />
        </div>`;

        $('.f61').append(famAddBlock3);
    });
    
    $(`[name="tbl1"]`).val(eMiyembro.id);
    $(`[name="tbl2"]`).val(ePangkabuhayan.id);
    $(`[name="tbl3"]`).val(eNutrisyon.id);
    $(`[name="tbl4"]`).val(ePWD.id);
    $(`[name="tbl5"]`).val(eBuntis.id);
    $(`[name="tbl6"]`).val(ePanlipunan.id);
    
    
    localStorage.setItem('recordNum', JSON.stringify({
        miyembro: eMiyembro.Family_members.length,
        nutrisyon: eNutrisyon.Family_members.length,
        pwd: ePWD.Family_members.length
    }));

    //$('.memContainer').

    // If there's an error, log it
    if (error) {
      console.error('Error connection! Please try again.', error.message);
    } else {
      // If successful, show an alert
      console.log('Connection secured!');
      $('.submit').removeAttr('disabled');
    }
  } catch (error) {
    console.error('Error:', error.message);
  }


  function nullChecker(elem, value) {
    if (value !== null ) {
      $(elem).val(value);  
    }
    
  }
}

// Call the checkConnection function
checkConnection();




async function nextPage2() {

  const recordNum = JSON.parse(localStorage.getItem('recordNum'));

  let miyembro = {
    pinuno: $('#fullname').val(),
    nakatira: $('#completeAdd').val(),
    Sitio: $('#sitio').val(),
    Purok: $('#purok').val(),
    sinoka: $('#relations').val(),
    bahayNumero: $('#houseNum').val(),
    kasarian: $('[name="gender"]:checked').val(),
    Family_members:new Array};
    

  for($i = 1; $i <= recordNum.miyembro; $i++) {
    miyembro[`Family_members`].push({
      member: $(`[name="fmember${$i}"]`).val(),
      bday: $(`[name="fbday${$i}"]`).val(),
      age: $(`[name="fage${$i}"]`).val(),
      civilStat: $(`[name="fcivilstatus${$i}"]`).val(),
      relation: $(`[name="frelation${$i}"]`).val(),
      edAttain: $(`[name="feducation${$i}"]`).val(),
      sourceIncome: $(`[name="fincome${$i}"]`).val(),
      genderPick: $(`[name="fgender${$i}"]`).val(),
      stay: $(`[name="fyears${$i}"]`).val(),
      incomePick: $(`[name="fmonthlyincome${$i}"]`).val(),
      philId: $(`[name="fphilid${$i}"]`).val(),
    });
  }


  const khaus = new Array;
    $('.khaus:checked').each(function(test, item) {
        khaus.push(item.value);
    });

    let pangkabuhayan =
    {
      LupangKinatatayuan: $('#lupa').val(),
      BahaynaTinitirhan: $('#bahayz').val(),
      LupangSakahanPinagyayaman: $('#upahan').val(),
      ParaanPagtataponngBasura: $('#basura').val(),
      GamitnaEnerhiyasaPagluluto: $('#luto').val(),
      PinagkukunanngTubig: $('#tubig').val(),
      UringPalikuran: $('#dumi').val(),
      PinagmumulanngElektrisidad: $('#kuryente').val(),
      sasakyan: $('#sasakyan').val(),
      KasangkapangpangAgrukultura: $('#agrikultura').val(),
      PangKomersiyo: $('#poultry').val(),
      MgaKasangkapansaBahay: JSON.stringify(khaus)
    }

   

   let nutrisyon = {'Family_members':new Array};

    for($i = 1; $i <= recordNum.nutrisyon; $i++) {
      nutrisyon[`Family_members`].push({
        member: $(document).find(`[name="nmember${$i}"]`).val(),
        kapanganakan: $(`[name="nkapanganakan${$i}"]`).val(),
        gulang: $(`[name="ngulang${$i}"]`).val(),
        timbang: $(`[name="ntimbang${$i}"]`).val(),
        imunisasyon: $(`[name="nimunisasyon${$i}"]`).val(),
        nagsagawa: $(`[name="nnasagawa${$i}"]`).val()
      })
    }


    let kalusuganPWD = {"Family_members":new Array,"Family_mem_2":new Array,"Family_mem_3":new Array};

    for($i = 1; $i <= recordNum.pwd; $i++) {
      kalusuganPWD[`Family_members`].push({
        member: $(`[name="pwdmember${$i}"]`).val(),
        kapanganakan: $(`[name="pwdkapanganakan${$i}"]`).val(),
        edad:$(`[name="pwdedad${$i}"]`).val(),
        kapansanan:$(`[name="pwdkapansanan${$i}"]`).val(),
        kasarian:$(`[name="pwdkasarian${$i}"]`).val()
      });
    }

    const fpp = new Array;
    $('.fpp:checked').each(function(test, item) {
        fpp.push(item.value);
    });

    let kalusuganBuntis = {
      MagAsawangNagsasama:$(`#kabuuan`).val(),
      BilangngIpinagbuntis:$(`#pagbubuntis`).val(),
      MayBalakpaMaganak:$(`#balak`).val(),
      Nagpapagamot:$(`#nagpapagamot`).val(),
      Kalagayan:$(`#kalagayan`).val(),
      FPmethod:JSON.stringify(fpp)
    }

    const aa = new Array;
    $('.pambaranggay').each(function(test, item) {
        aa.push(item.value);
    });

    const bb = new Array;
    $('.pambayan').each(function(test, item) {
        bb.push(item.value);
    });

    const cc = new Array;
    $('.organisasyon').each(function(test, item) {
        cc.push(item.value);
    });

    
    
    
    let panlipunan = {
      SamahangKinasaniban: JSON.stringify(aa),
      Pambarangay: JSON.stringify(bb),
      Pambayan: JSON.stringify(cc)
    }


    var fields = [
      [miyembro,"miyembro",parseInt($("[name='tbl1'").val())],
      [pangkabuhayan,"pangkabuhayan",parseInt($("[name='tbl2'").val())],
      [nutrisyon,"nutrisyon",parseInt($("[name='tbl3'").val())],
      [kalusuganPWD,"kalusuganPWD",parseInt($("[name='tbl4'").val())],
      [kalusuganBuntis,"kalusuganBuntis",parseInt($("[name='tbl5'").val())],
      [panlipunan,"panlipunan",parseInt($("[name='tbl6'").val())]
    ];

  fields.forEach(async function(field) {
    const { data, error } = await database
      .from(field[1])
      .update([field[0]])
      .eq('id', field[2]);
      
      console.log(data);
  });

  
  

  

  alert('User Updated!');
  return false;
  window.location.href = 'index.html';
  return false;
}