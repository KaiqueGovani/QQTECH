from flask import Flask, request, send_file
import pandas as pd
from openpyxl import Workbook
from openpyxl.utils.dataframe import dataframe_to_rows

server = Flask(__name__)

@server.route('/')
def index():
    return send_file('clientes.html');

@server.route('/<path:filename>')
def static_files(filename):
    return send_file(filename)

@server.route('/download_excel', methods=['POST'])
def download_excel():
    # Your JSON data
    json_data = request.json['json_data']
    
    # Parse JSON data
    data = pd.read_json(json_data)
    
    # Create Excel file
    excel_path = 'excel/' + request.json['nome'] + '.xlsx'

    # Write DataFrame to Excel
    wb = Workbook()
    ws = wb.active
    
    for row in dataframe_to_rows(data, index=False, header=True):
        ws.append(row)
    
    # Autofit column widths
    for column in ws.columns:
        max_length = 0
        column_letter = column[0].column_letter
        for cell in column:
            try:
                if len(str(cell.value)) > max_length:
                    max_length = len(cell.value)
            except:
                pass
        adjusted_width = (max_length + 2)
        ws.column_dimensions[column_letter].width = adjusted_width
    
    wb.save(excel_path)

    # data.to_excel(excel_path, index=False) -> Outro método para salvar o arquivo usando o Pandas;

    # Serve the Excel file for download
    response = send_file(excel_path, as_attachment=True)

    return response 

if __name__ == '__main__':
    server.run()
